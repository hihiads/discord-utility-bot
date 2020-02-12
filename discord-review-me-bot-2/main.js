let { checkIfSummoned } = require( './helpers.js' )
let { controller } = require( './controller.js' )

exports.main = async function(msgObj){

	// wait for new message from server
	// check if calling a bot
	// delegate to bot with command
	let request = await checkIfSummoned(msgObj)
	
	bot = await controller(request)

	response = bot.respond()

	return response
}
