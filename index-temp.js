require('dotenv').config() // environment variables

const Discord = require('discord.js') // Discord docs: https://bit.ly/39LYhac
const Client = new Discord.Client()


// login to the DotaFromZero Discord as the bot
// when we run the login method, it will emit the 'ready' event
// we can pretend it is connected by forcing the Client to emit
// a 'ready' message which it will listen for in the 'on' method

Client.on('ready', response => { // listening for the Client to emit 'ready'
  console.log('bot connected')
})

// forcing the client to emit a 'ready' message
// Client.emit('ready')


// connect to discord
Client.login(process.env.DISCORD_TOKEN)


