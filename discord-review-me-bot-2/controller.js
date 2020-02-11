let { ReviewBot } = require( './bots/ReviewBot.js' )
let { ScheduleBot } = require( './bots/ScheduleBot.js' )

exports.controller = (request) => { 
	bot = { 
		'review': () => new ReviewBot(request.name, request.command, request.content, request.msgObj),
		'schedule': () => new ScheduleBot(request.name, request.command, request.content, request.msgObj)
	}

	return bot[request.name]()

}