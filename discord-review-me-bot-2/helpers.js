exports.checkIfSummoned = (msgObj) => new Promise((resolve, reject) => {
	// split up message into an array
	const content = msgObj.content.split( " " )

	// ignore messages that do not start with !
	if (content[0][0] !== '!')
		return

	if(content[1] === undefined)
		reject( 'helpers.js line 10 - command was undefinied' )
	
	// resolve with an object - bot's name, bot's command and original message as an array
	resolve({ 
		name: content[0].slice(1,content[0].length), 
		command: content[1],
		content: content,
		msgObj: msgObj
	})
})

