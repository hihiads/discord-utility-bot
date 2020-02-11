class Bot {  
	constructor(request){ 
		this.name = request.name
		this.command = request.command
		this.message = request.message
		this.msgObj = request.msgObj
	}
}


module.exports = Bot