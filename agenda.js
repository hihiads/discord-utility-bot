async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);


const Agenda = require('agenda');

const connectionString = process.env.MONGODB_URI

const agenda = new Agenda({
	db: {address: connectionString, options: { useUnifiedTopology: true, autoReconnect: false, reconnectTries: false, reconnectInterval: false }, collection: 'lobby matches'},
	processEvery: '3 seconds'
});

agenda.define('send lobby invites', {priority: 'high', concurrency: 10}, (job, done) => {
	const {name} = job.attrs.data;
	console.log( `Hi ${name}, the lobby invites have been sent!` )
	agenda.cancel( { name: 'send lobby invites' }).then((value) => {
	  console.log( value )
	  graceful()
	})
	done()
});

remindMe = async (name) => {
	await agenda.start();
	await agenda.schedule('in 5 seconds', 'send lobby invites', {name: name});
}

console.log(remindMe('John Smith'))