// define the job to do at <number of> <minutes or hours>
const {hasPermission, sendMessage} = require( '../../helpers.js' )
const {getAuthToken, postSpreadSheetValues, getSpreadSheet} = require('../../services/googleSheets.js');
const { getHumanInterval } = require( '../../getHumanInterval.js' )
const humanInterval = require( 'human-interval' )


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
	await message.react('✅')
	
	messageID = message.id
	channelID = message.channel.id
	timeUntilEventString = await getHumanInterval(request.msgObj.content)

	console.log( `timeUntilEventString: ${timeUntilEventString}` )

	if ( timeUntilEventString === undefined) { return `Day was undefined. Maybe a typo?`}

	milliseconds = humanInterval(timeUntilEventString)

	console.log( `milliseconds until job runs: ${milliseconds}` )

	currentMinutes = minutesToMilliseconds(new Date().getMinutes())
	timestamp = (new Date().getTime() + (milliseconds) - currentMinutes) - minutes(59) - seconds(50)

	await global.agenda.schedule(timestamp, 'setup lobby', { messageID: messageID, channelID: channelID });

	return `new job will run task at this timestamp: ${timestamp}`

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

function seconds(s){ 
	return 1000 * s
}

function minutes(m){ 
	return 1000 * 60 * m
}

function hours(h){ 
	return 1000 * 60 * 60 * h
}

function hours(d){ 
	return 1000 * 60 * 60 * 24 * d
}

function minutesToMilliseconds(m){
	return 1000 * 60 * m
}

module.exports = {scheduleBot}