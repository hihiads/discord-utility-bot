let embedMessage = {}



scheduleBot = async (message) => {
  announcementMessage = await postAnnouncement(message, NA_ANNOUNCEMENTS_ID)
  await createReactions(announcementMessage)
  return 'Lobby posted'
}




postAnnouncement = async (message, channelID) => {
  const lobbyMessage = createLobbyMessage(message)
  embedMessage = createEmbedMessage(message)
  
	return await Client
    .channels
    .get(channelID)
    .send(lobbyMessage,{ embed: embedMessage })

  return 'lobby match posted to na-announcements\n'
}




createLobbyMessage = (message) => {

  const lobbyType = CommandArgs[5] // command the user used either '', open or meme

  const lobbyTypes = {
    open: `OPEN LOBBY MATCH\n${TIER_ONE_ID}${TIER_TWO_ID}${TIER_THREE_ID}`,
    meme: `🧐 MEME TEAM SATURDAY 🧐\n${TIER_ONE_ID}${TIER_TWO_ID}${TIER_THREE_ID}`,
    normal: `LOBBY MATCH\n${TIER_ONE_ID}${TIER_TWO_ID}`
  }

  let lobbyMessage = ''

  if (lobbyTypes[lobbyType] === undefined) // if user does not specify lobby type use normal
    return lobbyTypes['normal']
  
  return lobbyMessage = lobbyTypes[lobbyType] // otherwise return specified lobby type
}




createEmbedMessage = (message) => {
  const date = CommandArgs[2]
  const time = CommandArgs[3]
  const timezone = CommandArgs[4]
  const userNickname  = getNickname(message)
  const userIcon = message.author.avatarURL

  return embedObject(date, time, timezone, userNickname, userIcon)
}




// create our lobby match embed object
const embedObject = (date, time, timezone, userNickname, userIcon) => {
  return { 
      color: "10669055",
      title: `🎟️     NA Lobby Match ${date}     🎟️`, // example: Saturday 3/15/20
      description: `@ ${time} ${timezone}\n\nPosted By: ${userNickname}\n\n\n`, // 9:00pm America/New_York
      fields: [
        {
          name: "**__Radiant__**",
          value: "\u200b\n",
          inline: true
        },
        {
          name: "**__Dire__**",
          value: "\n1. Dean Doe\n2. John Smith\n3. Billy Ray\n4. Jessica Rabbit\n5. Joe Rogers",
          inline: true
        },
        {
          name: "\u200b",
          value: "\u200b"
        },
        {
          name: "**__Waiting List__**",
          value: "Wally Doe\nJohn Smith\nBilly Ray\nJessica Rabbit\nJoe Rogers",
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
        text: "Smash the  ✅  if you would like to participate.\nPick any positions you are comfortable playing\nusing the reactions below"
    }
  }
}




createReactions = async (message) => {
  await message.react('✅')
  // await message.react('1️⃣')
	// await message.react('2️⃣')
	// await message.react('3️⃣')
	// await message.react('4️⃣')
	// await message.react('5️⃣')
}




// Listen for reaction add or remove events
//-------------------------------------------------------------------------------------
Client.on('messageReactionAdd', (reactionMessage, user) => updateAnnouncementOnAdd(reactionMessage, user))
Client.on('messageUpdate', (oldMessage, newMessage) => updateAnnouncementOnRemove(oldMessage, newMessage)) 




updateAnnouncementOnAdd = async (reactionMessage, user) => {
  let messageID = reactionMessage.message.id
  
  let channel = await Client.channels.get('680108846466859078')
  let message = await channel.fetchMessage(messageID)

  let radiantPlayers = message.embeds[0].fields[0].value

  
  // update list with users username
  embedMessage.fields[0].value = user.bot ? "\u200b" : user.username


  embedMessage.title = "added"

  reactionMessage.message.edit('added', {embed: embedMessage})
  user.bot ? console.log('skipped bot\n') : console.log(`${user.username} added\n`)

  return `${PURPLE}new list after user added:\n${WHITE}${radiantPlayers}`
}




updateAnnouncementOnRemove = async (oldMessage, newMessage) => {

  console.log(newMessage)
//   let messageID = reactionMessage.message.id
  
//   let channel = await Client.channels.get('680108846466859078')
//   let message = await channel.fetchMessage(messageID)

//   let radiantPlayers = message.embeds[0].fields[0].value

//   embedMessage.fields[0].value = "\u200b"

//   embedMessage.title = "removed"
//   reactionMessage.message.edit('removed', {embed: embedMessage})
//   console.log(`${reactionMessage.message.author.username} removed\n`)

//  return `${PURPLE}new list after user removed:\n${WHITE}${radiantPlayers}`
}