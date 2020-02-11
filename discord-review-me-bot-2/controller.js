let { ReviewBot } = require( './bots/ReviewBot.js' )
let { ScheduleBot } = require( './bots/ScheduleBot.js' )

exports.controller = (request) => new Promise((resolve, reject) => {
  bot = { 
  	'review': () => new ReviewBot(request),
  	'schedule': () => new ScheduleBot(request)
  }

  resolve(bot[request.name]())
})