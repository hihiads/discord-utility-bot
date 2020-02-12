exports.checkIfSummoned = (msgObj) => new Promise((resolve, reject) => {
	// split up message into an array
	const message = msgObj.content.split( " " )

	// ignore messages that do not start with !
	if (message[0][0] !== '!')
		return

	if(message[1] === undefined)
		reject( 'command was undefined in helpers.js' )
	
	// resolve with an object - bot's name, bot's command and original message as an array
	resolve({ 
		name: message[0].slice(1,message[0].length), 
		command: message[1],
		message: message,
		msgObj: msgObj
	})
})


exports.createGoogleCert = function(){
	const fs = require('fs');
	 
	if (fs.existsSync('./gCreds.json'))
	{
		return
	}
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