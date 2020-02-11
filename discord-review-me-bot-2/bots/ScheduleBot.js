class ScheduleBot {  
	constructor(name, command, message, msgObj){ 
		this.name = name
		this.command = command
		this.message = message
		this.msgObj = msgObj
	}

	respond(){ 
		console.log( client )
		return `ScheduleBot class working with command ${this.command}`
	}
}


module.exports = {ScheduleBot: ScheduleBot}