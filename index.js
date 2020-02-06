// use nodemon index.js for local development for auto file reload

// assign the bot and discord classes

const Discord = require('discord.js');
const client = new Discord.Client();

let content;

let user;
let username;

let botName;

let messageObj;
let sentMessage;

let dmChannel;




const getMessage = (msgObj) => new Promise((resolve, reject) => {
	const content = msgObj.content
	if (content !== '!review') return;
	resolve(msgObj);
});




const sendMessage = (msgObj) => new Promise((resolve, reject) => {
	user = msgObj.author;
	botName = client.user.username;

	if (user.username === botName){
		console.log('not responding to my own message!');
		return
	}


	//user.send('hello');
	resolve(user.send('hello'));
});




const collectScore = (sentMsgObj) => new Promise((resolve, reject) => {
	const filter = m => m.content.startsWith('5');
	dmChannel = sentMsgObj.channel;

	resolve(
		dmChannel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
		.then(collected => collected)
		.catch(collected => console.log('time is up!'))
	);
});




const main = async (msgObj) => {

	messageObj = await getMessage(msgObj);
	sentMessage = await sendMessage(msgObj);

	scoreCollected = await collectScore(sentMessage);

	return [messageObj, sentMessage, scoreCollected];

}


client.login(process.env.DISCORD_TOKEN);

client.on( 'ready', msg => console.log('bot connected'));
client.on( 'message', msg => {

	main(msg)
	.then( (response) => { 
		console.log( response );
	} )
	.catch( ( error ) => { 
		console.log( 'WHOOPS ERROR: ' + error );
	} )
	.finally( ( data ) => { 
		console.log( 'bot finally out!' );
	} );

});