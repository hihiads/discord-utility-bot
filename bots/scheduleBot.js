scheduleBot = async (message) => {

  await postAnnouncement(message, '680108846466859078')
  
  return 'Lobby posted'
}


postAnnouncement = async (message, channelID) => {

  const arguments = stringToArray(message)

  const date = arguments[2]
  const time = arguments[3]
  const timezone = arguments[4]
  
  const lobbyType = arguments[5]
  const tierOneID = "<@&688288121938378783>"
  const tierTwoID = "<@&688288282211123211>"
  const tierThreeID = "<@&688288303115796486>" 
  const lobbyTypes = {
    open: `OPEN LOBBY MATCH\n${tierOneID}${tierTwoID}${tierThreeID}`,
    meme: `🧐 MEME TEAM SATURDAY 🧐\n${tierOneID}${tierTwoID}${tierThreeID}`
  }
  let lobbyMessage = ''

  const userNickname = getNickname(message)
  const userIcon = message.author.avatarURL



  // create our embed object and send the message to the NA announcements channel
  const lobbyEmbed = createLobbyEmbed(date, time, timezone, userNickname, userIcon)
  
  if (lobbyTypes[lobbyType] === undefined)
    lobbyMessage = `LOBBY MATCH\n${tierOneID}${tierTwoID}`
  else
    lobbyMessage = lobbyTypes[lobbyType]
	message = await Client
    .channels
    .get(channelID)
    .send(lobbyMessage,{ embed: lobbyEmbed })
	
  // react to message with join +/- buttons
  await message.react('✅')

  return 'lobby match posted to na-announcements\n'
}


// create our lobby match announcement embed message
const createLobbyEmbed = (date, time, timezone, userNickname, userIcon) => {
    return { 
      color: "10669055",
      title: `NA Lobby Match ${date}`, // example: Saturday 3/15/20
      description: `@ ${time} ${timezone}\n\nPosted By: ${userNickname}`, // 9:00pm America/New_York
      thumbnail: {
        url: `${userIcon}`
      },
      fields: [
        {
          name: "**__Players Signed Up__**",
          value: "Jane Doe\nJohn Smith\nBilly Ray\nJessica Rabbit\nJoe Rogers",
          inline: true
        },
        {
          name: "\b",
          value: "Jane Doe\nJohn Smith\nBilly Ray\nJessica Rabbit\nJoe Rogers",
          inline: true
        },
        {
          name: "\b",
          value: "\b"
        },
        {
          name: "**__Waiting List__**",
          value: "Jane Doe\nJohn Smith\nBilly Ray\nJessica Rabbit\nJoe Rogers",
          inline: true
        },
        {
          name: "**__Coaches__** ",
          value: "TheForce\nLucas\nMastic",
          inline: true
        }
      ],
      image: {
      url: "https://seeklogo.com/images/D/dota-2-logo-556BDCC022-seeklogo.com.png"
      },
      footer: {
      text: "Smash the ✅ if you would like to participate"
    }
    }
  }