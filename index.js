// load environment variables
require('dotenv').config() // load environment variables into process.env


// GLOBALS
//-------------------------------------------------------------------------------------
Discord = require('discord.js') // Discord docs: https://bit.ly/39LYhac
Client = new Discord.Client()
GUILD_ID = "680051862321627189"
PREFIX = "!dfz" // our command prefix

TIER_ONE_ID = "<@&688288121938378783>"
TIER_TWO_ID = "<@&688288282211123211>"
TIER_THREE_ID = "<@&688288303115796486>"

NA_ANNOUNCEMENTS_ID = "680108846466859078"
LOBBY_POST_CONTENT = "Hey guys, we're hosting an NA Lobby Match"
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
// login to the DotaFromZero Discord as the bot
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