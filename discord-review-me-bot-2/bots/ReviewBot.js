class ReviewBot {  
	constructor(name, command, message, msgObj){ 
		this.name = name
		this.command = command
		this.message = message
		this.msgObj = msgObj
	}

	respond(){ 
		console.log(this.msgObj)
		return `ReviewBot class working with command ${this.command}`
	}
}


module.exports = {ReviewBot: ReviewBot}