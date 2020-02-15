const Agenda = require('agenda')
const connectionString = process.env.MONGODB_URI
const agenda = new Agenda({
	db: {address: connectionString, options: { useUnifiedTopology: true, autoReconnect: false, reconnectTries: false, reconnectInterval: false }, collection: 'lobby matches'},
	processEvery: '10 seconds'
});


const {hasPermission, sendMessage} = require( '../helpers.js' )
const {getAuthToken, postSpreadSheetValues, getSpreadSheet} = require('../services/googleSheets.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = '';


const botMsgs = {

}


const scheduleBot = async (request) => {

	let userHasPermission = await hasPermission(request.msgObj, 'coach')

	if ( !userHasPermission ){
		return 'user does not have persmission to use the bot'
	}
	else {
		commands = {
			'lobby': lobby
		}

		let response = commands[request.command](request)
		
		return response
	}

}

//---------------------
//---------------------
// schedule bot methods
//---------------------
//---------------------

const lobby = async (request) => {

	/* command: !schedule lobby in <number> <minutes or hours>

	Bot posts in channel "Lobby match happening in <time> <minutes or hours> react with ✅ if you would like to participate!"

	keep the message variable to check for reactions end of timer

	Send DM to everyone who reacted with invite and link to general chat room

	next steps: take players and balance based on positions they would like to play */

	// scheduling the match is two parts:
	// creating the initial post to the general channel

	let numberOf = request.message[3]
	let minutesOrHours = request.message[4]

	let lobby = await global.client.channels
	let na_channel = ''

	for( let key of lobby.values() ){
		if( key.name === 'na-announcements' )
			na_channel = key
	}

	let message = await na_channel.send( `We will be hosting a 5v5 lobby for beginners in ${numberOf} ${minutesOrHours}! \nSmash that  ✅  if you would like to participate!\n\u200B` )
	message.react('✅')
	
	messageID = message.id
	channelID = message.channel.id

	




	// define the job to do at <number of> <minutes or hours>
	agenda.define('setup lobby', {priority: 'high', concurrency: 10}, async (job) => {
		// const {name} = job.attrs.data;
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

	setupLobby = async (name) => {
		await agenda.start();
		await agenda.schedule(`in ${numberOf} ${minutesOrHours}`, 'setup lobby');
	}

	result = await setupLobby()

	return result


	//notes:
	//use a custom emoji
	//const emoji = request.msgObj.guild.emojis.find(emoji => emoji.name === 'baby_yoda');
	// \u200B is the code for invisible space for line breaks
}



//---------------------
//---------------------
// schedule bot helpers
//---------------------
//---------------------






module.exports = {scheduleBot}