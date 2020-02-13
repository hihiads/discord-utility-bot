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
	//use a custom emoji
	//const emoji = request.msgObj.guild.emojis.find(emoji => emoji.name === 'baby_yoda');

	let day = request.message[2]

	// setup a lobby on saturday ( in 1 minute )

	// Bot makes initial announcement with reactions

	let lobby = await global.client.channels
	let na_channel = ''

	for( let key of lobby.values() ){
		if( key.name === 'na-announcements' )
			na_channel = key
	}

	// When timer goes off after 1 minute: 
	// everyone one who reacted gets put on the google spreadsheet
	// each person will get a DM with a lnk to the general voice channel

	// \u200B is the code for invisible space for line breaks
	let message = await na_channel.send( `This ${ day } we will be hosting several 5v5 lobbies for beginners. \nSmash that  ✅  if you would like to participate!\n\u200B` )
	return message.react('✅')

}



//---------------------
//---------------------
// schedule bot helpers
//---------------------
//---------------------






module.exports = {scheduleBot}