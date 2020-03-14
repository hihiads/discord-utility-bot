// terminal colors to use in log messages
RED='\033[0;31m'
GREEN='\033[0;32m'
WHITE='\033[1;37m'


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