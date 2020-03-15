// validate user command message
validateCommand = (message, bots) => {
  if (message.author.bot) 
    return
  else // get only the command without prefix or options
    command = getCommand(message) // helpers.js


  if (bots[command] === undefined) // check if command invalid
    throw Error('user did not enter a valid command')
  
  return command
}




// terminal colors to use in log messages
RED='\033[0;31m'
GREEN='\033[0;32m'
WHITE='\033[1;37m'
PURPLE='\033[0;35m'

// log pretty error message
logError = error =>
  console.log(
    `${RED}error path:\n${WHITE}${
      error
        .stack
        .split('\n')[1]
        .trim()
        .replace('(', '')
        .replace(')', '')}\n\n${RED}error message:\n${WHITE}${error.message
      }\n`
  )


// log pretty success message
logSuccess = message => console.log(`${GREEN}Success! ${WHITE}${message}`)


// check if users message is a normal chat message not a bot command
notACommand = message => {
    if (message.content.split(" ")[0] != PREFIX) // checks the first part of the message for !dfz
      return true
  }


// remove prefix and options leaving only the bot command
getCommand = message => message
  .content
  .replace("!dfz ","")
  .split(" ")[0]



// access each argument in bot command as array index
stringToArray = message => message.content.split(" ")


// get the users nickname
getNickname = message => {
  const nickname = message
    .guild
    .members
    .get(message.author.id)
    .nickname

  if (nickname === null)
    return message.author.username

  return nickname 
}


// get user's role
getRole = reactionMessage => reactionMessage
  .message
  .member
  .guild
  .roles
  .find(role => role.name === 'Coach') // if not found null


// get the lobby type to change the lobby message
getLobbyType = (command, lobbyTypes) => command === undefined ? lobbyTypes['normal'] : lobbyTypes[command]




getMessagebyID = async (response) => {
  const channel = await Client.channels.get('680108846466859078')
  const message = await channel.messages.get(response.d.message_id)
  return message
}



notValidLobbyPost = async (message) =>{
  if (message.content.split('\n')[0] == LOBBY_POST_CONTENT && message.author.username.split(" ")[0] == "DotaFromZero"){
    return false
  }

  return true

}