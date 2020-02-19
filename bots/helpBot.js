const {commandNotFound, hasPermission, sendMessage} = require( '../helpers.js' )

const helpBot = async (request) => {

	let userHasPermission = await hasPermission(request.msgObj, 'coach')

	if ( !userHasPermission ){
		return 'user does not have persmission to use the bot'
	}
	else {
		commands = {
			'me': me
		}

		if (commandNotFound(request, commands)) {
			return `user entered an invalid command: ${request.message}`
		}

		let response = commands[request.command](request)
		
		return response
	}

}

//---------------------
//---------------------
// schedule bot methods
//---------------------
//---------------------

const me = async (request) => {

	const helpMessage = {
		color: 0x0099ff,
		title: 'DFZ bot - A general purpose bot to make Xalnara happy',
		description: "```\nAvailable Commands:\n\n!review me <name>\n\n!schedule lobby <day> at <timeam/pm>\n\n!setup timezone\n\n!help me```",
		thumbnail: {
			url: 'http://getdrawings.com/free-icon/robot-icon-png-57.png',
		},
		footer: {
			text: 'created by TheForce. Special Thanks to all the testers and code contributors <3'
		},
	};

	request.msgObj.reply({ embed: helpMessage });
	return

}

module.exports = {helpBot}