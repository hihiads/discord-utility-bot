function l(x) {return console.log(x)}

const spacetime = require('spacetime')
const humanIntervalToDate = require( 'date.js' )



// use timezone names listed on this website: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function getUserEpoch(message, userTimeZoneTZ){	

	// message example !schedule lobby today at 3:00pm	

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )
	time = message.split( ' ' )[4]
	console.log(time)

	dateObj = humanIntervalToDate(request)

	return spacetime( dateObj, userTimeZoneTZ ).time( time ).goto('Etc/UTC').epoch
}





module.exports = {
	getUserEpoch
}
