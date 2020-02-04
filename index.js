const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	bad_words = ["fuck", "shit", "pussies", "pussy", "dick", "asshole"];

	flagged_words = [];

	user_cursed = false;

	bad_words.forEach(function(bad_word){
		if (msg.content.includes(bad_word) && msg.author.username != 'potty-mouth-bot') {
			user_cursed = true;
			flagged_words.push(bad_word);
			console.log(msg.author.username)
		}
	});

	if (user_cursed){
			msg.reply('I noticed you said ' + flagged_words.toString() + '! Please try to keep it clean on this server!');
	}
	
});

client.login(process.env.DISCORD_TOKEN);