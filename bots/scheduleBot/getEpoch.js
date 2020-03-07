function l(x) {return console.log(x)}

const spacetime = require('spacetime')
require('spacetime-week')



// use timezone names listed on this website: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function getUserEpoch(message, userTimeZoneTZ){	

	// message example !schedule lobby today at 3:00pm	


	let s = spacetime.now()

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )

	day = message.split( ' ' )[2]
	time = message.split( ' ' )[4]

	if (day.toLowerCase() == 'today') {
		try{
			day = spacetime().goto(userTimeZoneTZ).dayName()
		}
		catch(e){
		 return e 
		}
	}else if (day.toLowerCase() == 'tomorrow') {
		day = spacetime().goto(userTimeZoneTZ).add(1,'day').dayName()
	} else{
		day = day.toLowerCase()
		s = s.weekStart( day )
		s = s.endOf('week')
	}

	// check if in the past
	let now = s.goto(userTimeZoneTZ).weekStart( day )
	let userDate = s.goto(userTimeZoneTZ)weekStart(day).day(day).time(time)

	console.log( `now: ${now}` )
	console.log( `userDate: ${userDate}` )

	if (userDate.isBefore(now)) {
		return 'timeMachine'
	}	

	return s.goto(userTimeZoneTZ).weekStart(day).day(day).time(time).epoch
}





module.exports = {
	getUserEpoch
}
