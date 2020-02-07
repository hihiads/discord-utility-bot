// use nodemon index.js for local development for auto file reload
const {
  getAuthToken,
  postSpreadSheetValues
} = require('./googleSheetsService.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = 'reviews';

const Discord = require('discord.js')
const client = new Discord.Client()

let content, user, username, botName, messageObj, sentMessage, dmChannel

let coach, student

let score = 'Hello! Please rate your lesson ' 
score += 'from 1 - 10 (10 being awesome)'

let comment = 'Thanks! Lastly, please leave a short comment '
comment += 'telling us what you thought about the lesson'

let thanks = 'Thanks for your input!'

const botMsgs = {score: score, comment: comment, thanks: thanks}


const getMessage = (msgObj) => new Promise((resolve, reject) => {
	const content = msgObj.content.split( " " )
	if (content[0] !== '!review') return
	resolve(msgObj)
})




const sendMessage = (msgObj, botMsg) => new Promise((resolve, reject) => {
	user = msgObj.author
	botName = client.user.username

	if (user.username === botName){
		console.log('not responding to my own message!')
		return
	}

	//user.send('hello')
	resolve(user.send(botMsg))
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
		coach = messageObj.member.nickname

		// get student user object
		let rawID = content[2]
		let studentID = rawID.substring(3, rawID.length-1)
		let studentObj = await client.fetchUser(studentID)

		student = studentObj.lastMessage.member.nickname

		// ask for score & collect response
		let sentMessage = await sendMessage(msgObj, botMsgs.score)
		let scoreCollectedObj = await collectScore(sentMessage)
		let score = scoreCollectedObj.first().content

		// ask for comment & collect response
		sentMessage = await sendMessage(msgObj, botMsgs.comment)
		let commentCollectedObj = await collectComment(sentMessage)
		let comment = await commentCollectedObj.first().content

		// complete the conversation
		sentMessage = await sendMessage(msgObj, botMsgs.thanks)
		

		// post to the google sheet
		let values = [coach, student, score, comment]
		const auth = await getAuthToken();
		const response = await postSpreadSheetValues({spreadsheetId, auth, sheetName, values})

		return {response}
	}

	if ( command === 'stats' )
	{  
		return 'someone called for stats'
	}

}

// client.login(process.env.DISCORD_TOKEN)
client.login('NjY5Njc2MDQxNDAwMzUyNzcy.XjnxeA.N0IpJ0geJ2QQU2YDfOdC9DNkCOA')


client.on( 'ready', msg => console.log('bot connected'))
client.on( 'message', msg => {
	main(msg)
	.then( (response) => { 
		//console.log('output for postSpreadSheetValues', JSON.stringify(response, null, 2));
	} )
	.catch( ( error ) => { 
		console.log( 'WHOOPS ERROR: ' + error )
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!' )
	} )

})