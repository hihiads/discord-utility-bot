function l(x) {return console.log(x)}

const spacetime = require('spacetime')
const humanIntervalToDate = require( 'date.js' )

const redis = require( 'redis' )
let client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true})

// use timezone names listed on this website: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function getUserEpoch(message, userTimeZoneTZ){		

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )
	time = message.split( ' ' )[2]

	dateObj = humanIntervalToDate(request)

	return spacetime( dateObj, userTimeZoneTZ ).time( time ).epoch
}



async function getUserTimeZone(username) {
	
	let promise = new Promise( (resolve, reject) => {
		client.get(username, (err, reply) => {
			try{
				let userTimeZoneTZ = reply.toString()
				resolve(userTimeZoneTZ)
			} catch(err){
				resolve( false )
			}
		})
	})

	let response = await promise;

	return response
}



async function setUserTimeZone(username, timezone) {

	let promise = new Promise( (resolve, reject) => {
		client.set(username, timezone, (err, reply) => {
			let response = reply.toString()
			resolve(response)
		})
	})

	let response = await promise;

	return response
}


// let main = async () => {
// 	let timezone = await getUserTimeZone( 'john' )
// 	if( timezone == false ){
// 		return false
// 		//console.log( 'please setup your timezone using the "!setup timezone <your timezone name>" command. You can find the timezone names here: https://bit.ly/2P1Zyl3' )
// 	}
	
// 	return timezone
// }

// main()


module.exports = {
	getUserEpoch,
	getUserTimeZone,
	setUserTimeZone
}

