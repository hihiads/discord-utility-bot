const hasPermission = (msgObj, role) => new Promise((resolve, reject) => {

	let roles = Array.from(msgObj.guild.roles)
	
	let guildRoles = [];

	for (var i = 0; i < roles.length; i++) {
		temp = {};
		temp.id = roles[i][0]
		temp.name = roles[i][1].name
		guildRoles.push(temp)
	}

	let hasRole = false

	coachID = guildRoles.filter( r =>  r.name === role)[0].id

	if(msgObj.member.roles.has(coachID)) {
	  hasRole = true
	}

	const content = msgObj.content.split( " " )
	
	if ( hasRole === false ){
		msgObj.reply( 'Sorry this bot is for coaches only!' )
		resolve(false)
	}
	resolve(msgObj)
})



const sendMessage = (user, botMsg) => new Promise((resolve, reject) => {
	botName = global.discordClient.user.username

	if (user.username === botName){
		console.log('not responding to my own message!')
		return
	}

	resolve(user.send(botMsg))
})



const collectMessage = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (typeof m.content === 'string')
	let channel = sentMsgObj.channel
	resolve(channel.awaitMessages(filter, { max: 1 }))
})


module.exports = {hasPermission, sendMessage, collectMessage}