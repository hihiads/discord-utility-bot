const {hasPermission, sendMessage} = require( '../helpers.js' )
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

	// get student user object
	let rawID = request.message[2]
	let studentID = rawID.substring(3, rawID.length-1)
	let studentObj = await client.fetchUser(studentID)

	// student = studentObj.lastMessage.member.nickname
	student = studentObj.username

	// ask for score & collect response
	let sentMessage = await sendMessage(studentObj, botMsgs.score)
	let scoreCollectedObj = await getScore(sentMessage)
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

	return response	

}

const stats = async (request) => {
	let test = await 'stats command was called!'
	return test
}


//-------------------
//-------------------
// review bot helpers
//-------------------
//-------------------

const getScore = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (m.content > 0 && m.content < 11)
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})



const getComment = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (typeof m.content === 'string')
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})


module.exports = {reviewBot}