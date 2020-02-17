function l(x) {return console.log(x)}
const spacetime = require('spacetime')
const redis = require( 'redis' )
const humanIntervalToDate = require( 'date.js' )

function getUserEpoch(message, userTimeZoneTZ){		

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )
	time = message.split( ' ' )[2]

	dateObj = humanIntervalToDate(request)

	return spacetime( dateObj, userTimeZoneTZ ).time( time ).epoch
}

function getUserTimeZoneTZ(username) {
	// connect to redis key value store
	let client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true})
	
	// check if user is in redis, if not tell them to set their timezone
	
	return client.get( username, function(err, reply){
		console.log( reply )
	})
}

getUserTimeZoneTZ('foo')