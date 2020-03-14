// load environment variables
require('dotenv').config() // load environment variables into process.env

// load helpers
require('./helpers') // helper functions

// load bots
require('./bots/helpBot')




// GLOBALS
//-------------------------------------------------------------------------------------
Discord = require('discord.js') // Discord docs: https://bit.ly/39LYhac
Client = new Discord.Client()

PREFIX = "!dfz" // our command prefix
//-------------------------------------------------------------------------------------
// END GLOBALS//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------




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