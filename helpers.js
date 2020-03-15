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
logSuccess = message => console.log(`${GREEN}Success! ${WHITE}${message}\n`)


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




getNicknameFromUserID = async user_id => { 
  let guildMember = await Client.guilds.get(GUILD_ID).fetchMember(user_id)

  const nickname = guildMember.nickname

  if (nickname === null)
    return guildMember.user.username

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




getMessagebyID = async message_id => {
  try{
    const channel = Client.channels.get(NA_ANNOUNCEMENTS_ID)
    const messages = await channel.fetchMessages({limit: 15})
    return messages.get(message_id) === undefined ? `\n${PURPLE}Message too old to update\n` : messages.get(message_id)
  } catch(error) {
    logError(error)
  }
}



notValidLobbyPost = async message => {
  if (message.content.split('\n')[0] == LOBBY_POST_CONTENT && message.author.username.split(" ")[0] == "DotaFromZero"){
    return false
  }

  return true
}




getEmbedFields = message => message.embeds[0].fields // returns array




// create an object that holds all the values we need to update the embed message
getUpdateData = async (user, message, userEmbedUpdateData) => {

  userEmbedUpdateData.nickname = await getNicknameFromUserID(user.id)
  
  fields = getEmbedFields(message)
  
  userEmbedUpdateData.radiantPlayers = fields[RADIANT].value.split('\n')
  userEmbedUpdateData.direPlayers = fields[DIRE].value.split('\n')
  userEmbedUpdateData.waitingList = fields[WAITINGLIST].value.split('\n')
  userEmbedUpdateData.coaches = fields[COACHES].value.split('\n')


  return userEmbedUpdateData
}




userFoundInTheEmbed = (userEmbedUpdateData) => {
  // take all the fields and put them in one big array
  const combinedEmbedList = userEmbedUpdateData
    .radiantPlayers
    .concat(userEmbedUpdateData.direPlayers)
    .concat(userEmbedUpdateData.waitingList)
    .concat(userEmbedUpdateData.coaches)
    .map( (entry) => entry.substring(3, entry.length)) // strip away the number and period so only the name remains


  return (combinedEmbedList.includes(userEmbedUpdateData.nickname))
}
