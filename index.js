// use nodemon index.js for local development for auto file reload

const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.content == "!ping"){ // Check if content of message is "!ping"
		//msg.channel.send("pong Mo Gains!"); // Call .send() on the channel object the message was sent in
		msg.author.send('How many stars would you give your coach? (Enter a number from 1 to 5)')
		
		const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { max: 10, maxMatches: 10 });
		collector.next.then(collec => {
			
		    // console.log(collec);
		});
		collector.on('collect', (el, c) => {
		    msg.channel.send('Found message: ' + el.content);
		    console.log(el);
		    // console.log(c);
		    collector.stop();
		});
		collector.on('end', (c, r) => {
		    // console.log('c');
		    msg.channel.send("End Emitted!");
		});
		// .then( msg =>
		// 	msg.channel.awaitMessages(msg => msg.content.match(/[1-5]/g), {max:1}).then(response => console.log(response))
		// )


		// .then(msg => msg.channel.awaitMessages(msg => msg.content.match(/[1-5]/g))
		// .then(collected => collected.next((response) => console.log(response))))
	}

	// if(parseInt(msg.content) > 0 || parseInt(msg.content) < 11){
	// 	msg.author.send("Got it. Finally please leave a short review")
	// 	.then(msg => msg.channel.awaitMessages(msg => msg.content.match(/.+/g),{max: 1})
	// 	.then(collected => collected.map((response) => console.log(response))));
	// }
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

