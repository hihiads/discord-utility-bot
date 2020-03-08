const {hasPermission, sendMessage, collectMessage} = require( '../helpers.js' )


const setupBot = async (request) => {

	let userHasPermission = await hasPermission(request.msgObj, 'Coach')

	if ( !userHasPermission ){
		return 'user does not have persmission to use the bot'
	}
	else {
		commands = {
			'timezone': timezone
		}

		let response = commands[request.command](request)
		
		return response
	}

}




let timezone = async (request) => {

	// prompt the user to enter their timezone
	sentMsgObj = await sendMessage(request.msgObj.author, 'Please enter your timezone. You can copy/paste the "TZ datebase name":\nhttps://en.wikipedia.org/wiki/List_of_tz_database_time_zones\nExample: America/New_York (do not include quotation marks just the text)')
	

	// collect the response
	let responseObj = await collectMessage( sentMsgObj )

	// get the username and timezone from the response object
	let username = await responseObj.first().author.username
	let timezone = await responseObj.first().content


	// post to redis key, value (username, timezone)

	let valueSet = await redisClient.set(username, timezone)
	console.log(`redis set value response code: ${valueSet}`)


	if (valueSet) {
		await sendMessage(request.msgObj.author, 'Timezone set. Thanks!')
	}

	
	// get the timezone of the user as a test
	let userTimeZone = await getAsync(username)
	

	return userTimeZone

}




module.exports = {setupBot}
