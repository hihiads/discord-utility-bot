function l(x) {return console.log(x)}

const spacetime = require('spacetime')
const humanIntervalToDate = require( 'date.js' )



// use timezone names listed on this website: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function getUserEpoch(message, userTimeZoneTZ){	

	// message example !schedule lobby today at 3:00pm	

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )
	time = message.split( ' ' )[2]

	date = humanIntervalToDate(request)
	console.log(`human date: ${date}`)

	d = spacetime(date, 'UTC')
	console.log(`spacetime d1: ${d}`)

	d = d.time(time)
	console.log(`d.time: ${d}`)

	d = d.goto(userTimeZoneTZ)
	console.log(`d.goto: ${d}`)

	
	return d.epoch
}





module.exports = {
	getUserEpoch
}
