function startAgendaJobs() { 
	const Agenda = require('agenda')
	const connectionString = process.env.MONGODB_URI

	global.agenda = new Agenda({
	db: {address: connectionString, options: { useUnifiedTopology: true, autoReconnect: false, reconnectTries: false, reconnectInterval: false }, collection: 'lobby matches'},
	processEvery: '10 seconds'
	});

	global.agenda.define('setup lobby', {priority: 'high', concurrency: 10}, 
		async (job) => {
			// collect data saved in db
			const {messageID, channelID} = job.attrs.data;

			// get the channel, message then drill down to the reactions collection
			nachannel = await global.client.channels.get( channelID )
			myLobbyMessage = await nachannel.fetchMessage( messageID )
			reactionsCollection = await myLobbyMessage.reactions

			// collect all users who reacted to the choosen emoji
			messageReaction = await reactionsCollection.get('✅')
			users = await messageReaction.fetchUsers()
			
			// send each user a message a few minutes before the event scheduled to join
			// the General voice chat
			
			//console.log( users )

			users.forEach((value) => console.log( value ))
			// delete from mongo db when completed
			// agenda.cancel( { name: 'setup lobby' }).then((value) => {
			//   console.log( value )
			// })
		});
	global.agenda.start(); 
}

module.exports = { startAgendaJobs }