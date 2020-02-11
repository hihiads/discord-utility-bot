// download the gCreds.json for google api scripts
// file system module to perform file operations
const fs = require('fs');
 
// json data
var jsonData = '{"type":"service_account","project_id":"dfz-bots","private_key_id":"16f55878f17eaf8a221f21fba4686f64b4493ffd","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXPUwVqHNNNW+W\\nxKAaFLA/N7TPO5Wn2lUVtO3yVigfIkh0kMyGfUf3IcSjIhe35B7/uImNeHan/9Fh\\n/6QqfSDbQFOm33pLnefuhJeI0lgJoiOqbUl6nZLOno1o2N5XDXPhNtjrlEqu3ni6\\nNz48F1Lc+BUA8OleQRJ49o76Ui5u0MHqsvODHKImvc2orPZu9SeGjANxxhXW/j1p\\n4YfkoNKLwIBWj0DGnUCehpuNf+oRcEtbGXBuZ1/bnrk9cThkvO2Nz0IhlaFvElHP\\nlklP/ISt3W+8aNBP+lmWieGaurjm8lMcFRfhvEpGei2RdZFOfItx0Gy/Lxdj5LJ0\\nDOVz7dfLAgMBAAECggEAAww7J5NbDpzTF69xFO12EW8YgFa3p8jPq58EP4o4xzgV\\nDpF+U+kyO62euzCgZVo1lilmyToLdBWLQXf9OxzKelBO3u4LLUbvIdF+09Emrfw9\\nxQwHHlVc3tAf8Hwhqdnm6il8qNlQtWkxDHH7z54E7lwU8A55P3xsZooXPDQttCP5\\n7vrSt23Wf+5uQyrIDynAUt5piJmWF5J3QJrRhv31XI01vBl9MGZNbznWpNaYLSMO\\nLTxFOmkHtbcVtpRZ/v5UveFa69FYELN45JBWBK9JKAR1tmlkKFrhZjTzJkOxWll2\\nspuaxU7vbA17zJ8aTX4PfgzSSY0kmCp7VjBJEQleAQKBgQD/j8u9OC+CHpJS1ClQ\\nQmHI2k3HmBBitUijy6Cb3YMYbxImq6WEYttalWJqszyG4kqel8/LAy+Ne9G0sYgt\\n2TSdM8ocdFbs2e3ii7TWit6KGZxK0OVIuycB5muQpVbBL45N+vrgiP8js30NnDR7\\nZa5AJwpVnVRk+ae90PuKe+Vu2QKBgQDXm8xC6at9VkIMC2YRxo8Y/ApCvl3I4Y4z\\nQP4gfm4uYpemjDsJHCxtVpVUhym6bkFzTaWn/VqMGYM+kfYfsPWg2FaUzSv6o51f\\nzpN+oFf0JpE3/WqLg2+MWoFAn6QSvTwBzJrweV8n9PIhlY6frR6S/FenB4dYrLMp\\nauVsQmVdQwKBgQDAe7y3gub9eSs6aYPIaIcf8ZSdnWHSBrp0a/1HCBsiPx4LtEKR\\nKKgQXO1ociFHco9DThJ61KZvSPAUyZZI+gzPzl8O+W0zLZ0ngZQt9yBQIaP/EcFv\\n+04Q90zTAEUMclYbU8q7bVPFvv2UT6+TtWz98qms/DfBaew2Yn3iuxh+WQKBgB+Q\\nJTTedEZi7ERLHuQXRzeHHhFrQNt5eZGzQACNwZ90u3KcMMBCqZZQCIhZSRiLr3Ur\\ntsaC5lCAI6BzSa6V/z9OrE4YQwnsDcvKt/jfjECnrLafmItX8GqBjU5ikGhV34T7\\n6OqvOejliNS1yi1B8Knf2w0OoxeuIIQ9q9xPU/t1AoGAW6MADG68nnAtIx0r0kRB\\nYjMuirRvXE7WNibfcGvDgBxq8MKgZDoHAz25GzYivYgz6CcvqScLy2l9DafJN6lI\\nD3mPO373W3jqq1BEqRc4NX5jCuhJJE0nN2lSLEb4mt4CV8x3GdZ5+8HaS48f42n5\\nLKbv4lM+QR/EE/HL2qjN1vc=\\n-----END PRIVATE KEY-----\\n","client_email":"googlesheetsuser@dfz-bots.iam.gserviceaccount.com","client_id":"112384669861394955367","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/googlesheetsuser%40dfz-bots.iam.gserviceaccount.com"}';
 
// parse json
var jsonObj = JSON.parse(jsonData);
console.log('gcreds obj successfully created');
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
console.log('gcreds content successfully created');
 
fs.writeFile("gCreds.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});

// use nodemon index.js for local development for auto file reload
const {
  getAuthToken,
  postSpreadSheetValues,
  getSpreadSheet
} = require('./googleSheetsService.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = 'reviews';

const Discord = require('discord.js')
const client = new Discord.Client()

let content, user, username, botName, messageObj, sentMessage, dmChannel, response

let coach, student

// all bot messages
let score = 'Hello! Please rate your lesson ' 
score += 'from 1 - 10 (10 being awesome)'

let comment = 'Thanks! Lastly, please leave a short comment '
comment += 'telling us what you thought about the lesson'

let thanks = 'Thanks for your input!'

let notPermitted = 'sorry only coaches can summon me to do things!'

const botMsgs = {score: score, comment: comment, thanks: thanks, notPermitted: notPermitted}


const getMessage = (msgObj) => new Promise((resolve, reject) => {
	const content = msgObj.content.split( " " )
	if (content[0] !== '!review') return
	if ( !hasCoachID(msgObj) ){
		msgObj.reply( botMsgs.notPermitted )
		return
	}
	resolve(msgObj)
})




const sendMessage = (studentObj, botMsg) => new Promise((resolve, reject) => {
	botName = client.user.username

	if (studentObj.username === botName){
		console.log('not responding to my own message!')
		return
	}

	resolve(studentObj.send(botMsg))
})




const collectScore = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (m.content > 0 && m.content < 11)
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})


const collectComment = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => (typeof m.content === 'string')
	dmChannel = sentMsgObj.channel

	resolve(dmChannel.awaitMessages(filter, { max: 1 }))
})


const main = async (msgObj) => {

	// start dm review in channel with !review
	let messageObj = await getMessage(msgObj)

	let content = messageObj.content.split(" ")
	let command = content[1]
	
	if ( command === 'me' )
	{	

		// get name of coach
		coach = messageObj.author.username

		// get student user object
		let rawID = content[2]
		let studentID = rawID.substring(3, rawID.length-1)
		let studentObj = await client.fetchUser(studentID)

		// student = studentObj.lastMessage.member.nickname
		student = studentObj.username

		// ask for score & collect response
		let sentMessage = await sendMessage(studentObj, botMsgs.score)
		let scoreCollectedObj = await collectScore(sentMessage)
		let score = scoreCollectedObj.first().content

		// ask for comment & collect response
		sentMessage = await sendMessage(studentObj, botMsgs.comment)
		let commentCollectedObj = await collectComment(sentMessage)
		let comment = await commentCollectedObj.first().content

		// complete the conversation
		sentMessage = await sendMessage(studentObj, botMsgs.thanks)
		

		// post to the google sheet
		let values = [coach, student, score, comment]
		const auth = await getAuthToken();
		response = await postSpreadSheetValues({spreadsheetId, auth, sheetName, values})

		return response
	}

	if ( command === 'stats' )
	{  
		// get coach nickname
		let rawID = content[2]
		let coachID = rawID.substring(3, rawID.length-1)
		let coachObj = await client.fetchUser(coachID)

		coach = coachObj.username

		const auth = await getAuthToken();
		const data = await getSpreadSheet({spreadsheetId, auth, sheetName})

		let coachData = getCoachRows(data, coach)

		let avgRating = getAvgRating(coachData)

		response = await messageObj.author.send( 'Average review for ' + coach + ' is ' + avgRating.toFixed(2) )


		return response
	}

}


// client.login(process.env.DISCORD_TOKEN)
client.login('NjY5Njc2MDQxNDAwMzUyNzcy.Xj3UPg.OVLQB1NiHA7wovLhW4T2p0Vj-F4')



client.on( 'ready', msg => console.log('bot connected'))
client.on( 'message', msg => {
	main(msg)
	.then( (response) => { 
		console.log(response);
	} )
	.catch( ( error ) => { 
		console.log( 'WHOOPS ERROR: ' + error )
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!' )
	} )

})



// HELPERS
function hasCoachID(messageObj) {
	let roles = Array.from(messageObj.guild.roles)
	
	let guildRoles = [];

	for (var i = 0; i < roles.length; i++) {
		temp = {};
		temp.id = roles[i][0]
		temp.name = roles[i][1].name
		guildRoles.push(temp)
	}

	let hasRole = false

	coachID = guildRoles.filter( role =>  role.name === 'coach')[0].id

	if(messageObj.member.roles.has(coachID)) {
	  hasRole = true
	}

	return hasRole
}



function getCoachRows(data, coach) {
	data = Array.from(data)
	return(data.filter( data => data[0] === coach ))
}

function getAvgRating(coachData) {
	let scores = [];
	for (var i = 0; i < coachData.length; i++) {
		let score = coachData[i][2]
		scores.push( parseInt(score) )
	}
	return scores.reduce( (total, sum) => total + sum) / scores.length
}