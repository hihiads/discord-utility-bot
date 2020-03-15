// key value pair command: bot function
const bots = {
  help: helpBot,
  lobby: scheduleBot
}



// listen for incomming messages
Client.on('message', message => {
  
  // guard
  if (notACommand(message)) return

  Guild = Client.guilds.get(GUILD_ID)
  CommandArgs = stringToArray(message)
  
  route(message) // send the message to our route function which delegates to the correct bot function
    .then(response => logSuccess(response))
    .catch(error => logError(error))
})


let command, messageArray

const route = async message => {
  command = validateCommand(message, bots)
  return bots[command](message)
}