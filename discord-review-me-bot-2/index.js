let { reviewBot } = require( './bots/reviewBot.js' )

// create google api creds file
const fs = require('fs');

if (!fs.existsSync('./gCreds.json')) {
    
	// json data
	var jsonData = process.env.gJSON
	 
	// parse json
	var jsonObj = JSON.parse(jsonData);
	console.log('gcreds obj successfully created');
	 
	// stringify JSON Object
	var jsonContent = JSON.stringify(jsonObj);
	console.log('gcreds content successfully created');
	 
	fs.writeFile("./gCreds.json", jsonContent, 'utf8', function (err) {
	    if (err) {
	        console.log("An error occured while writing JSON Object to File.");
	        return console.log(err);
	    }
	 
	    console.log("JSON file has been saved.");
	});

}

// connect to discord
const Discord = require('discord.js')
const DISCORD_TOKEN = process.env.DISCORD_TOKEN
global.client = new Discord.Client()
client.login(DISCORD_TOKEN)
client.on( 'ready', msg => console.log( 'bot connected' ))


// run main() when new messages detected on the server
client.on( 'message', msg => {
	// check if we're being summoned and return the correct bot
	// split up message into an array
	const message =  msg.content.split( " " )

	// ignore messages that do not start with !
	if (message[0][0] !== '!')
		return

	if(message[1] === undefined)
		reject( 'command rejected in summonBot.js' )

	// resolve with an object - bot's name, bot's command and original message as an array
	let request = { 
		'name': message[0].slice(1,message[0].length), 
		'command': message[1],
		'message': message,
		'msgObj': msg
	}

	const controller = new Map( [['review', reviewBot]] )

	let bot = controller.get(request.name)

	bot(request)
	.then( (response) => { 
		console.log(response)
	} )
	.catch( ( error ) => { 
		console.log( 'whoops: ' + error )
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!')
	} )
})