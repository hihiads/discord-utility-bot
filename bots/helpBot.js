helpBot = async (message) => {

	const helpMessage = {
		color: 0x0099ff,
		title: 'DotaFromZero bot',
		description: `\nCommands:\n\n${PREFIX} lobby <date> <time> <timezone> <lobbytype>\n\nexample: ${PREFIX} lobby 3/15/20 9:00pm EST meme\n\nlobby types: meme, open or just leave blank\nto ping tiers 1 & 2`,
		thumbnail: {
			url: 'http://getdrawings.com/free-icon/robot-icon-png-57.png',
		},
		footer: {
			text: 'created by TheForce. Special Thanks to all the testers and devs <3'
		},
	}

	await message.reply({ embed: helpMessage })

	return 'Help message sent\n'
}