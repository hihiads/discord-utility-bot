function l(x){ console.log(x) }

// message example "!schedule lobby today at 5 PM"

function getNumDaysUntilEvent(message, hourObj) {  
	const days = { 
		sunday: 	0,
		monday: 	1,
		tuesday: 	2,
		wednesday: 	3,
		thursday: 	4,
		friday: 	5,
		saturday: 	6
	}

	let fromToday = new Date().getDay()
	days['today'] = fromToday
	days['tomorrow'] = (fromToday + 1) % 7
	let dayOfEvent = message.split(" ")[2]
	dayOfEvent = days[dayOfEvent.toLowerCase()]

	if( dayOfEvent === undefined )
		return undefined

	let daysUntilEvent = fromToday
	let count = 0

	while( daysUntilEvent !== dayOfEvent ){ 
		daysUntilEvent = ( daysUntilEvent + 1 ) % 7
		count++
	}

	daysUntilEvent = count

	return daysUntilEvent - hourObj.daysToSubtract
}

function getNumHoursUntilEvent(message) { 
	daysToSubtract = 0
	currentHour = new Date().getHours()
	currentPartOfDay = ""

	if (currentHour >= 0 && currentHour < 12) {
		currentPartOfDay = "am"
	} else {
		currentPartOfDay = "pm"
	}

	targetHour = parseInt(message.split( " " )[4])
	partOfDay = message.split( " " )[5].toLowerCase()

	if ( partOfDay === "pm" ){
		targetHour = 12 + targetHour
	} 
	if ( targetHour === 12 && partOfDay === "am" ){ 
		targetHour = 0
	}

	let hoursUntilEvent = currentHour
	let count = 0

	while( hoursUntilEvent !== targetHour ){ 
		hoursUntilEvent = ( hoursUntilEvent + 1 ) % 24
		if( hoursUntilEvent < currentHour )
			daysToSubtract = 1
		count++
	}


	if (targetHour === currentHour && partOfDay === currentPartOfDay) {
		hoursUntilEvent = 0
	} else {
		hoursUntilEvent = count
	}



 	return { hoursAway: hoursUntilEvent, daysToSubtract: daysToSubtract } 
}

function getHumanInterval(message){

	hourObj = getNumHoursUntilEvent(message)
	numOfDays = getNumDaysUntilEvent( message, hourObj )

	if ( numOfDays === undefined ){ 
		return undefined
	}

	if ( numOfDays === 0 ){ 
		return hourObj.hoursAway === 1 ? `one hour` : `${hourObj.hoursAway} hours`
	}

	if ( hourObj.hoursAway === 0 ) { 
		return numOfDays === 1 ? `one day` : `${numOfDays} days`
	}

	return `in ${numOfDays} days and ${hourObj.hoursAway} hours`
}

module.exports = { getHumanInterval }