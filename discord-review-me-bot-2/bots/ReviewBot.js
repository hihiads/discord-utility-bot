class ReviewBot {  
	constructor(request) {
		this.request = request
	}
	
	async review() {
		return 'starting the review'
	}

	async stats() {
		return 'some stats'
	}

	respond() {
		let commands = new Map( [ ['me', this.review], ['stats', this.stats] ] )
		return commands.get(this.request.command)()
	}
	
}


module.exports = {ReviewBot}