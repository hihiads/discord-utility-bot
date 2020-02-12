let { ReviewBot } = require( './bots/ReviewBot.js' )

async function summonBot(msgObj){
	// split up message into an array
	const message =  await msgObj.content.split( " " )

	// ignore messages that do not start with !
	if (message[0][0] !== '!')
		return

	if(message[1] === undefined)
		reject( 'command rejected in summonBot.js' )
	
	// resolve with an object - bot's name, bot's command and original message as an array
	let request = { 
		'name': message[0].slice(1,message[0].length), 
		'command': message[1],
		'message': message,
		'msgObj': msgObj
	}

	const controller = new Map( [['review', ReviewBot]] )

	let bot = controller.get(request.name)

	bot = new bot(request)

	return bot.respond()
}


module.exports = { summonBot }