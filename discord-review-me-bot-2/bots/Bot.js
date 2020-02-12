class Bot {  
	constructor(request){ 
		this.name = request.name
		this.command = request.command
		this.message = request.message // full message as an array
		this.msgObj = request.msgObj
	}

	getUserObj(){
		return new Promise((resolve, reject) => {
		  let unformattedID = this.message[2]
		  let userID = unformattedID.substring(3, unformattedID.length-1)
		  let userObj = client.fetchUser(userID)
		  resolve(userObj)
		})
	}

	//user is the User object
	//of the person we want to DM
	//message is the text string
	sendDM(user, message){
		return new Promise((resolve, reject) => {
		  resolve(user.send(message))
		})
	}
}


module.exports = Bot