function l(x) {return console.log(x)}

const spacetime = require('spacetime')



// use timezone names listed on this website: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function getUserEpoch(message, userTimeZoneTZ){	

	// message example !schedule lobby today at 3:00pm	

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )

	time = message.split( ' ' )[2]

	day = message[0]
	

	d = spacetime.now()
	
	d = d.goto(userTimeZoneTZ)

	if (day.toLowerCase() == 'today') {
		day = d.dayName()
	}

	if (day.toLowerCase() == 'tomorrow') {
		day = d.add(1,'day').dayName()
	}

	
	d = d.time(time)


	d = d.day(day)


	return d.epoch
}





module.exports = {
	getUserEpoch
}
