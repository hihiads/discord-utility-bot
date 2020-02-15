function startAgendaJobs() { 
	const Agenda = require('agenda')
	const connectionString = process.env.MONGODB_URI

	global.agenda = new Agenda({
	db: {address: connectionString, options: { useUnifiedTopology: true, autoReconnect: false, reconnectTries: false, reconnectInterval: false }, collection: 'lobby matches'},
	processEvery: '10 seconds'
	});

	global.agenda.define('setup lobby', {priority: 'high', concurrency: 10}, 
		async (job) => {
			const {messageID, channelID} = job.attrs.data;
			nachannel = await global.client.channels.get( channelID )
			myLobbyMessage = await nachannel.fetchMessage( messageID )
			reactionsCollection = await myLobbyMessage.reactions
			messageReaction = await reactionsCollection.get('✅')
			users = await messageReaction.fetchUsers()
			console.log( users )

			// delete from mongo db when completed
			// agenda.cancel( { name: 'setup lobby' }).then((value) => {
			//   console.log( value )
			// })
		});
	global.agenda.start(); 
}

module.exports = { startAgendaJobs }