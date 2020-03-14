// controller takes an object of key value pairs
// using the message content as a key 
// returning the value
// which is the bot function
const bots = {
  help: helpBot,
  lobby: scheduleBot
}


// listen for messages on the server
// when someone sends a bot command
// run the route method
Client.on('message', message => {
  if (notACommand(message)) // guard against normal messages on the server - helpers.js
    return
  
  route(message) // send the message to our route function which delegates to the correct bot function
    .then(response => logSuccess(response))
    .catch(error => logError(error))
})


// guard against messages coming from the bot itself
// otherwise validate the users command
// run the bot function associated with the command
let command, messageArray

const route = async message => {
  command = validateCommand(message)
  return bots[command](message)
}


// validation rules:
// message is from a bot return
// if the bots object does not contain the key
// the user entered, the command is invalid
// throw an error but do not exit the program
const validateCommand = message => {
  if (message.author.bot) 
    return
  else // get only the command without prefix or options
    command = getCommand(message) // helpers.js


  if (bots[command] === undefined) // check if command invalid
    throw Error('user did not enter a valid command')
  
  return command
}