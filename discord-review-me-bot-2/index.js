let {Discord, DISCORD_TOKEN} = require( './globals' )

// connect to discord
global.client = new Discord.Client()
client.login(DISCORD_TOKEN)
client.on( 'ready', msg => console.log( 'bot connected' ))

// our main method is where the bot classes run all commands based on the message received
let { main } = require( './main.js' )

// run main() when new messages detected on the server
client.on( 'message', msg => {
	main(msg)
	.then( (response) => { 
		console.log('success! response: ' + response);
	} )
	.catch( ( error ) => { 
		console.log( 'whoops: ' + error )
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!' )
	} )
})