let Bot = require( './Bot.js' )

const {
  getAuthToken,
  postSpreadSheetValues,
  getSpreadSheet
} = require('../services/googleSheets.js');

class ReviewBot extends Bot {  
	constructor(request){ 
		super( request ) // pass properties from parent bot class

		this.dispatcher = {
			'me': this.getReview(),
			'stats': this.getStats()
		}

		this.botMsg = {
			'score': 'Hello! Please rate your lesson from 1-5 (5 being awesome!)',
			'comment': 'Thanks! Lastly, please leave a short comment telling us what you thought about the lesson',
			'thanks': 'Thanks for your input!'
		}
	}


	getScore(messageObj){
		return new Promise((resolve, reject) => {
			const filter = m => (m.content > 0 && m.content < 6)
			let dmChannel = messageObj.channel
			resolve(dmChannel.awaitMessages(filter, { max: 1 }))
		})
	}


	getComment(messageObj){
		return new Promise((resolve, reject) => {
			const filter = m => (typeof m.content === 'string')
			let dmChannel = messageObj.channel
			resolve(dmChannel.awaitMessages(filter, { max: 1 }))
		})
	}
	

		async getReview(){

		//get coach name
		let coachName = await this.msgObj.author.username
		
		// get student user object
		let student = await super.getUserObj()

		// ask for score & collect response
		let messageObj = await super.sendDM(student, this.botMsg.score)
		let collectedMessageObj = await this.getScore(messageObj)
		let score = await collectedMessageObj.first().content

		// ask for comment & collect response
		messageObj = await super.sendDM(student, this.botMsg.comment)
		collectedMessageObj = await this.getComment(messageObj)
		let comment = await collectedMessageObj.first().content

		// say thanks
		await super.sendDM(student, this.botMsg.thanks)

		// post to the google sheet
		let values = [coachName, student.username, score, comment]
		const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
		const sheetName = 'reviews';
		const auth = await getAuthToken();
		response = await postSpreadSheetValues({spreadsheetId, auth, sheetName, values})

		return response
	}


		async getStats(){
		// get coach nickname
		let coach = await super.getUserObj()

		coach = coachObj.username

		const auth = await getAuthToken();
		const data = await getSpreadSheet({spreadsheetId, auth, sheetName})

		let coachData = getCoachRows(data, coach)

		let avgRating = getAvgRating(coachData)

		response = await messageObj.author.send( 'Average review for ' + coach + ' is ' + avgRating.toFixed(2) )


		return response
	}

	respond = async () => {
	  if (this.command === undefined) {
	  	reject( 'command was undefined in ReviewBot.js' )
	  }
	  return (await this.dispatcher[this.command])
	}
}


module.exports = {ReviewBot: ReviewBot}