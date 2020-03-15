const lobbyTypes = {
    open: `OPEN LOBBY MATCH\n${TIER_ONE_ID}${TIER_TWO_ID}${TIER_THREE_ID}`,
    meme: `MEME TEAM SATURDAY\n${TIER_ONE_ID}${TIER_TWO_ID}${TIER_THREE_ID}`,
    normal: `LOBBY MATCH\n${TIER_ONE_ID}${TIER_TWO_ID}`
  }

let lobbyType, 
  embedMessage, 
  eventName



scheduleBot = async (message) => {
  lobbyType = getLobbyType(CommandArgs[5], lobbyTypes)
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
  const date = CommandArgs[2]
  return `Hey guys, we're hosting an NA Lobby Match\nPlease react if you would like to participate\n-------------------------------\n${lobbyType}\n`
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
      title: `🎟️  NA Lobby Match ${date}  🎟️`,
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




// this is a patch due to a bug in discord on the messageReactionRemove event not working
// https://github.com/discordjs/discord.js/issues/3941#event-3129973046
Client.on('raw', (response) => {
  // guard
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(response.t)) return
  
  updateAnnouncement(response)
})




updateAnnouncement = async (response) => {

  const message = await getMessagebyID(response)


  if(await notValidLobbyPost(message)) return

  console.log(response)
  
}