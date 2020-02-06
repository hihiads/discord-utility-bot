// use nodemon index.js for local development for auto file reload

// assign the bot and discord classes

const Discord = require('discord.js');
const client = new Discord.Client();


// these async functions will run inside of get_summoned in order
// and return results we can work with later for logging
const getReady = () => new Promise((resolve, reject) => {
  client.on( 'ready', msg => resolve( 'bot ready and waiting!' ) );
});

const getMessage = () => new Promise((resolve, reject) => {
  client.on( 'message', msg => resolve( {msg: msg, log: 'captured a message!'} ) );
});

const checkIfSummoned = (message) => new Promise((resolve, reject) => {
  let words = message.content.split( " " );
  if ( words[0] === '!review' ) { 
  	resolve( "i've been summoned!" );
  }
  else {
  	reject( "I have not been summoned!" );
  }
});

const getStudentID =  (message) => new Promise((resolve, reject) => {
	let studentID = message.content;
	studentID = studentID.split(" ");
	studentID = studentID[2];
	studentID = studentID.substring(3, studentID.length-1);
	resolve({id: studentID, log: 'student ID found!'});
});

const getStudent = (studentID) => new Promise((resolve, reject) => {
	resolve( client.fetchUser(studentID.id) );
})

const startReview =  (message, student) => new Promise((resolve, reject) => {
	let msg = 'Hi! Did you have a good session with your coach?';
	msg = msg + ' Please enter a score from 1 - 10 (10 being the best)';
	resolve(student.send(msg));
});

const listenForReviewScore = (message) => new Promise((resolve, reject) => {
	const response = message.channel.awaitMessages(() => true, {max: 1})
	resolve( response );
});

// this is where everything runs at the intended time
const getSummoned = async () => {
	const ready = await getReady();
	const message = await getMessage();
	const summoned = await checkIfSummoned(message.msg);
	const studentID = await getStudentID(message.msg);
	const student = await getStudent(studentID);
	const dmMessage = await startReview(message.msg, student);
	const reviewScore = await listenForReviewScore(dmMessage);

	return [ready, message.log, summoned, studentID.log, reviewScore.first()];
};


getSummoned()
.then( ( response ) => { 
	console.log( 'then: ' + response );
} )
.catch( ( error ) => { 
	console.log( 'WHOOPS ERROR: ' + error );
} )
.finally( ( data ) => { 
	console.log( 'bot finally out!' );
} );


// login
client.login(process.env.DISCORD_TOKEN);