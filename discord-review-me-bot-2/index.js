// todo make better
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
let {Discord, DISCORD_TOKEN} = require( './globals' )
global.client = new Discord.Client()
client.login(DISCORD_TOKEN)
client.on( 'ready', msg => console.log( 'bot connected' ))

// our main method is where the bot classes run all commands based on the message received
let { summonBot } = require( './summonBot.js' )

// run main() when new messages detected on the server
client.on( 'message', msg => {
	// check if we're being summoned and return the correct bot
	summonBot(msg)
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