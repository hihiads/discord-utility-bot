// use nodemon index.js for local development for auto file reload
const {
  getAuthToken,
  postSpreadSheetValues,
  getSpreadSheet
} = require('./googleSheetsService.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = 'reviews';

const Discord = require('discord.js')
const client = new Discord.Client()

let content, user, username, botName, messageObj, sentMessage, dmChannel, response

let coach, student

// all bot messages
let score = 'Hello! Please rate your lesson ' 
score += 'from 1 - 10 (10 being awesome)'

let comment = 'Thanks! Lastly, please leave a short comment '
comment += 'telling us what you thought about the lesson'

let thanks = 'Thanks for your input!'

let notPermitted = 'sorry only coaches can summon me to do things!'

const botMsgs = {score: score, comment: comment, thanks: thanks, notPermitted: notPermitted}


const getMessage = (msgObj) => new Promise((resolve, reject) => {
	const content = msgObj.content.split( " " )
	if (content[0] !== '!review') return
	if ( !hasCoachID(msgObj) ){
		msgObj.reply( botMsgs.notPermitted )
		return
	}
	resolve(msgObj)
})




const sendMessage = (studentObj, botMsg) => new Promise((resolve, reject) => {
	botName = client.user.username

	if (studentObj.username === botName){
		console.log('not responding to my own message!')
		return
	}

	resolve(studentObj.send(botMsg))
})




const collectScore = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (m.content > 0 && m.content < 11)
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})


const collectComment = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (typeof m.content === 'string')
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})


const main = async (msgObj) => {

	// start dm review in channel with !review
	let messageObj = await getMessage(msgObj)

	let content = messageObj.content.split(" ")
	let command = content[1]
	
	if ( command === 'me' )
	{	

		// get name of coach
		coach = messageObj.author.username

		// get student user object
		let rawID = content[2]
		let studentID = rawID.substring(3, rawID.length-1)
		let studentObj = await client.fetchUser(studentID)

		// student = studentObj.lastMessage.member.nickname
		student = studentObj.username

		// ask for score & collect response
		let sentMessage = await sendMessage(studentObj, botMsgs.score)
		let scoreCollectedObj = await collectScore(sentMessage)
		let score = scoreCollectedObj.first().content

		// ask for comment & collect response
		sentMessage = await sendMessage(studentObj, botMsgs.comment)
		let commentCollectedObj = await collectComment(sentMessage)
		let comment = await commentCollectedObj.first().content

		// complete the conversation
		sentMessage = await sendMessage(studentObj, botMsgs.thanks)
		

		// post to the google sheet
		let values = [coach, student, score, comment]
		const auth = await getAuthToken();
		response = await postSpreadSheetValues({spreadsheetId, auth, sheetName, values})

		return response
	}

	if ( command === 'stats' )
	{  
		// get coach nickname
		let rawID = content[2]
		let coachID = rawID.substring(3, rawID.length-1)
		let coachObj = await client.fetchUser(coachID)

		coach = coachObj.lastMessage.member.nickname

		const auth = await getAuthToken();
		const data = await getSpreadSheet({spreadsheetId, auth, sheetName})

		let coachData = getCoachRows(data, coach)

		let avgRating = getAvgRating(coachData)

		//response = await sendMessage( coachObj,'Average review for ' + coach + ' is ' + avgRating.toFixed(2) )

		return response
	}

}


client.login(process.env.DISCORD_TOKEN)

client.on( 'ready', msg => console.log('bot connected'))
client.on( 'message', msg => {
	main(msg)
	.then( (response) => { 
		console.log(response);
	} )
	.catch( ( error ) => { 
		console.log( 'WHOOPS ERROR: ' + error )
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!' )
	} )

})



// HELPERS
function hasCoachID(messageObj) {
	let roles = Array.from(messageObj.guild.roles)
	
	let guildRoles = [];

	for (var i = 0; i < roles.length; i++) {
		temp = {};
		temp.id = roles[i][0]
		temp.name = roles[i][1].name
		guildRoles.push(temp)
	}

	let hasRole = false

	coachID = guildRoles.filter( role =>  role.name === 'coach')[0].id

	if(messageObj.member.roles.has(coachID)) {
	  hasRole = true
	}

	return hasRole
}



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