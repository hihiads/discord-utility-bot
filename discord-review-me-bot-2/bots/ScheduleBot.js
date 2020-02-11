let Bot = require( './Bot.js' )

class ScheduleBot extends Bot{  
	constructor(request){ 
		super( request )

		this.dispatcher = {
			'saturday': this.saturday()
		}
	}

	saturday(){
		return new Promise((resolve, reject) => {
		  resolve( `it's saturday wooohoo!` )
		})
	}

	respond(){ 
		return new Promise((resolve, reject) => {
		  if (this.command === undefined) {
		  	reject( 'command was undefined in ReviewBot.js' )
		  }
		  console.log( `ScheduleBot class returned the method associated with the ${this.command} command` )
		  resolve( this.dispatcher[this.command] )
		})
	}
}


module.exports = {ScheduleBot: ScheduleBot}