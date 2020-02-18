const {hasPermission, sendMessage} = require( '../helpers.js' )

const setupBot = async (request) => {

	let userHasPermission = await hasPermission(request.msgObj, 'coach')

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




const timezone = async (request) => {
	sentMsgObj = await sendMessage(request.msgObj.author, 'please enter your timezone')
	let responseObj = await getTimeZone( sentMsgObj )
	let timeZone = await responseObj.first().content

	return timeZone

}




const getTimeZone = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (typeof m.content === 'string')
	let channel = sentMsgObj.channel
	resolve(channel.awaitMessages(filter, { max: 1 }))
})

module.exports = {setupBot}