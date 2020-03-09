function l(x) {return console.log(x)}
const spacetime = require('spacetime')



// use timezone names listed on this website: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function getUserEpoch(message, userTimeZoneTZ){	

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )

	lobbyDay = message.split( ' ' )[2].toLowerCase()
	lobbyTime = message.split( ' ' )[4]

	// convert am/pm to lowercase
	let timeArray = lobbyTime.split('')
	timeArray[timeArray.length-1] = timeArray[timeArray.length-1].toLowerCase()
	timeArray[timeArray.length-2] = timeArray[timeArray.length-2].toLowerCase()
	lobbyTime = timeArray.join('')

	userCurrentDate = spacetime
		.now()
		.goto( userTimeZoneTZ )

  if(lobbyDay == 'today'){
    lobbyDay = userCurrentDate.dayName()
  }


	lobbyDate = spacetime
		.now()
		.goto( userTimeZoneTZ )
		.weekStart( 'today' )
		.day( lobbyDay )
		.time( lobbyTime )

  console.log(lobbyDate)


  days = ['today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  if ( days.includes(lobbyDay) == false )
  {
    return false
  }

	if( lobbyDate.isBefore( userCurrentDate ) ){
		return 'timeMachine'
	}

	l( `lobby date epoch: ${lobbyDate.epoch}` )

	return lobbyDate.epoch
}

module.exports = {
	getUserEpoch
}