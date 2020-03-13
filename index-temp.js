require('dotenv').config() // load environment variables into process.env
require('./helpers') // helper functions

// START GLOBALS
//-------------------------------------------------------------------------------------
Discord = require('discord.js') // Discord docs: https://bit.ly/39LYhac
Client = new Discord.Client()
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

Client.on('ready', () => logSuccess('Success! Bot connected\n')) // listen for when bot logs in
//-------------------------------------------------------------------------------------
//END ENTRY POINT----------------------------------------------------------------------
//-------------------------------------------------------------------------------------