const {commandNotFound, hasPermission, sendMessage} = require( '../helpers.js' )
const {getAuthToken, postSpreadSheetValues, getSpreadSheet} = require('../services/googleSheets.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = 'reviews';


const botMsgs = {
	'score': 'Hello! Please rate your lesson from 1 - 5 (5 being awesome)',
	'comment': 'Thanks! Lastly, please leave a short comment telling us what you thought about the lesson',
	'thanks': 'Thanks for your input!'
}


const reviewBot = async (request) => {

	let userHasPermission = await hasPermission(request.msgObj, 'coach')

	if ( !userHasPermission ){
		return 'user does not have persmission to use the bot'
	}
	else {
		commands = {
			'me': me,
			'stats': stats
		}

		if (commandNotFound(request, commands)) {
			return `user entered an invalid command: ${request.message}`
		}

		let response = commands[request.command](request)
		
		return response
	}

}

//-------------------
//-------------------
// review bot methods
//-------------------
//-------------------

const me = async (request) => {
	// get name of coach
	coach = request.msgObj.author.username
	coachID = request.msgObj.author.id

	// get student user object
	let rawID = request.message[2]
	let studentID = rawID.replace(/[^0-9]/g, '')
	console.log( `\nrawID: ${rawID}\nstudentID: ${studentID}\n` )
	let studentObj = await global.discordClient.fetchUser(studentID)

	// student = studentObj.lastMessage.member.nickname
	student = studentObj.username

	// ask for score & collect response
	let sentMessage = await sendMessage(studentObj, botMsgs.score)
	let scoreCollectedObj = await getScore(sentMessage)

	// avoid duplicate calls to the bot
	let lastMessageID = await scoreCollectedObj.first().channel.lastMessageID
	let channel = await sentMessage.channel
	lastMessage = await channel.fetchMessage(lastMessageID)

	let now = Date.now()

	if(lastMessage.author.bot && lastMessage.createdTimestamp > now - 10000){
		console.log( 'bot duplicate request found' )
		return
	}

	let score = scoreCollectedObj.first().content


	// ask for comment & collect response
	sentMessage = await sendMessage(studentObj, botMsgs.comment)
	let commentCollectedObj = await getComment(sentMessage)
	let comment = await commentCollectedObj.first().content

	// complete the conversation
	sentMessage = await sendMessage(studentObj, botMsgs.thanks)

	// post to the google sheet
	let values = [coach, student, score, comment]

	const auth = await getAuthToken();

	response = await postSpreadSheetValues({spreadsheetId, auth, sheetName, values})

	return `${values} added to google spreadsheet!`	

}

const stats = async (request) => {
	// get coach nickname
	let rawID = request.message[2]
	let coachID = rawID.substring(3, rawID.length-1)
	let coachObj = await global.discordClient.fetchUser(coachID)

	coach = coachObj.username

	const auth = await getAuthToken();
	const data = await getSpreadSheet({spreadsheetId, auth, sheetName})

	let coachData = getCoachRows(data, coach)

	let avgRating = getAvgRating(coachData)

	response = await request.msgObj.author.send( 'Average review for ' + coach + ' is ' + avgRating.toFixed(2) )

	return `rating sent to ${request.msgObj.author.username}`
}


//-------------------
//-------------------
// review bot helpers
//-------------------
//-------------------

const getScore = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (m.content > 0 && m.content < 11 || m.author.bot)
	dmChannel = sentMsgObj.channel
	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})



const getComment = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (typeof m.content === 'string' 
		&& m.content != 'Hello! Please rate your lesson from 1 - 5 (5 being awesome)')
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})


function getCoachRows(data, coach) {
	data = Array.from(data)
	return(data.filter( data => data[0] === coach ))
}


function getAvgRating(coachData) {
	let scores = [];
	for (var i = 0; i < coachData.length; i++) {
		let score = coachData[i][2]
		scores.push( parseInt(score) )
	}
	return scores.reduce( (total, sum) => total + sum) / scores.length
}


module.exports = {reviewBot}