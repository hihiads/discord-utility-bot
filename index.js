// use nodemon index.js for local development for auto file reload

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.content == "!ping"){ // Check if content of message is "!ping"
		//msg.channel.send("pong Mo Gains!"); // Call .send() on the channel object the message was sent in
		
		msg.author.send('hi!')
		.then(msg => msg.channel.awaitMessages(msg => msg.content.match(/.+/g),{max: 1})
		.then(collected => 
			collected.map((response) => 
				response.author.send('hi you said: ' + response.content))
		));
		
	}
	// a coach is finish working with a student and wants to allow
	// the student to leave a review
	// the coach has permission to call the bot using !review me followed
	// by the lesson type and students discord name on the server

	// the bot will then DM the student asking for a review from 1-10 (10 being the best)

	// if the user input is valid the bot will then ask the student to leave a short review

	// the data then gets sent to a google sheet for record keeping.
	// the row will be coach name, student name, date of lesson, lesson type, coach score, and review

	//---------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------

	// when a head coach wants to see info about a coach they will call the bot with !review check
	// followed by the coaches name

	// the bot will then create a short report of the coaches avg rating, last session, and last review

	// finally the head coach will call !reviewreport to get a report of all lessons logged
	// within the current month

	//!review help will give a short documentation of all commands
});

client.login(process.env.DISCORD_TOKEN);


