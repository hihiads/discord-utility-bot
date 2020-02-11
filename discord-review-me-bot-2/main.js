let { checkIfSummoned } = require( './helpers.js' )
let { controller } = require( './controller.js' )

exports.main = async (msgObj) => {

	// wait for new message from server
	// check if calling a bot
	// delegate to bot with command
	let request = await checkIfSummoned(msgObj)
	
	//console.log( `bot being called is ${request.name} and command is ${request.command}.\nThe original request is: ${request.message}.` )

	bot = controller(request)

	return bot.respond()
}
