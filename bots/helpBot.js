helpBot = async (message) => {

	const helpMessage = {
		color: 0x0099ff,
		title: 'DotaFromZero bot',
		description: "```\nCommands:\n\n!schedule lobby <day> at <timeam/pm>\n\n!setup timezone\n\n!dfz help```",
		thumbnail: {
			url: 'http://getdrawings.com/free-icon/robot-icon-png-57.png',
		},
		footer: {
			text: 'created by TheForce. Special Thanks to all the testers and devs <3'
		},
	};

	message.reply({ embed: helpMessage });

	return 'Success! Help message sent\n'

}