let Bot = require( './Bot.js' )

class ReviewBot extends Bot {  
	constructor(request){ 
		super( request )

		this.dispatcher = {
			'me': this.getReview()
		}
	}

	getReview(){  
		return 'review collected!'
	}

	respond(){ 
		return new Promise((resolve, reject) => {
		  if (this.command === undefined) {
		  	reject( 'command was undefined in ReviewBot.js' )
		  }
		  console.log( `ReviewBot class returned the method associated with the ${this.command} command` )
		  resolve( this.dispatcher[this.command] )
		})
	}
}


module.exports = {ReviewBot: ReviewBot}