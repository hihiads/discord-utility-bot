function l(x) {return console.log(x)}

const spacetime = require('spacetime')
const humanIntervalToDate = require( 'date.js' )

const redis = require( 'redis' )
let client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true})



function getUserEpoch(message, userTimeZoneTZ){		

	let request = message.split( ' ' ).slice( 2, 5 ).join( ' ' )
	time = message.split( ' ' )[2]

	dateObj = humanIntervalToDate(request)

	return spacetime( dateObj, userTimeZoneTZ ).time( time ).epoch
}


async function getUserTimeZoneTZ(username) {
	
	let promise = new Promise( (resolve, reject) => {
		client.get(username, (err, reply) => {
			let userTimeZoneTZ = reply.toString()
			resolve(userTimeZoneTZ)
		})
	})

	let response = await promise;

	return response
}

let main = async () => {
	let timezone = await getUserTimeZoneTZ('foo')

	console.log(timezone)
}

main()