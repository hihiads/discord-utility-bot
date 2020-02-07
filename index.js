// use nodemon index.js for local development for auto file reload

// assign the bot and discord classes
//const h = require('./helpers.js')

const Discord = require('discord.js')
const client = new Discord.Client()

let content

let user
let username

let botName

let messageObj
let sentMessage

let dmChannel


let score = 'Hello! Please rate your lesson ' 
score += 'from 1 - 10 (10 being awesome)'

let comment = 'Thanks! Lastly, please leave a short comment '
comment += 'telling us what you thought about the lesson'

let thanks = 'Thanks for your input!'

const botMsgs = {score: score, comment: comment, thanks: thanks}


const getMessage = (msgObj) => new Promise((resolve, reject) => {
	const content = msgObj.content
	if (content !== '!review') return
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
	const filter = m => m.content.startsWith('1')
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


	return [score, comment]

}


client.login(process.env.DISCORD_TOKEN)
client.on( 'ready', msg => console.log('bot connected'))
client.on( 'message', msg => {

	main(msg)
	.then( (response) => { 
		console.log( response )
	} )
	.catch( ( error ) => { 
		console.log( 'WHOOPS ERROR: ' + error )
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!' )
	} )

})