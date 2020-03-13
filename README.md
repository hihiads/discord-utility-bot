[![Run on Repl.it](https://repl.it/badge/github/sojohnnysaid/discord-utility-bot)](https://repl.it/github/sojohnnysaid/discord-utility-bot)


First create a .env file with the following:


DISCORD_TOKEN='your bot token'

GCLOUD_PROJECT='google api project name'

gJSON='google api cred json (from the json file downloaded)'

GOOGLE_APPLICATION_CREDENTIALS='./gCreds.json'

MONGODB_URI='your mongodb cloud uri (I use heroku resources for this)'

REDISCLOUD_URL='your redis cloud uri (I use heroku resources for this)'




To get the bot running, type in the terminal:



npm install


This will install all the libraries we need.

then type:

node index.js

this will get the bot running. You should see it says "bot connected."

now you can go to the dev server in discord
and type !help me

the bot should be all set. Happy coding =)
