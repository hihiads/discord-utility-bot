// load environment variables
require('dotenv').config() // load environment variables into process.env


// GLOBALS
//-------------------------------------------------------------------------------------
Discord = require('discord.js') // Discord docs: https://bit.ly/39LYhac
Client = new Discord.Client()

PREFIX = process.env.BOT_COMMANDS_PREFIX || '!dfz' // our command prefix

GUILD_ID = process.env.GUILD_ID
GUILD_NAME = process.env.GUILD_NAME || 'DotaFromZero'

TIER_ONE_ID = process.env.TIER_ONE_ID
TIER_TWO_ID = process.env.TIER_TWO_ID
TIER_THREE_ID = process.env.TIER_THREE_ID

ANNOUNCEMENTS_ID = process.env.ANNOUNCEMENTS_ID

LOBBY_POST_CONTENT = "Hey guys, we're hosting an NA Lobby Match"

// embed indexes
RADIANT = 0
DIRE = 1
WAITINGLIST = 3
COACHES = 4
//-------------------------------------------------------------------------------------
// END GLOBALS//-----------------------------------------------------------------------
//-------------------------------------------------------------------------------------


// load helpers
require('./helpers') // helper functions

// load bots
require('./bots/helpBot')
require('./bots/scheduleBot')




// START ENTRY POINT
//-------------------------------------------------------------------------------------
// login to the Discord as the bot
// login method returns a promise so we can use .then and .catch
Client.login(process.env.DISCORD_TOKEN)
  .then(
    require('./controller.js') // handle messages in our controller
  )
  .catch( error => 
    logError(error)
  )

Client.on('ready', () => logSuccess('Bot connected\n')) // listen for when bot logs in

//-------------------------------------------------------------------------------------
//END ENTRY POINT----------------------------------------------------------------------
//-------------------------------------------------------------------------------------
