require('./bots/helpBot')

const bots = {
  help: helpBot
}

route = async message => {
  if (message.author.bot)
    return `${PURPLE}bot sent message\n`
  else
    return bots['help'](message)
}

Client.on('message', message => 
  route(message)
  .then(response => logSuccess(response))
  .catch(error => logError(error))
)