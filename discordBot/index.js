const{ Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')
var fs = require('fs');
var path = require('path');


//Add custom log function to prepend a tag for this bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready',() => {
    journalLog(process.env.LOG_PREFIX, 'Bot is online');
})

client.on('messageCreate',message => {

    var jsonPath = path.join(__dirname, 'botResponses.json');
    var obj = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
     
    //Sample
    if (message.content == '!test'){
        journalLog(process.env.LOG_PREFIX, "Sample journal log");
        message.reply(obj.sample[0].item)
    }
    
})

function journalLog(prefix, command){

    let journalMsg = "";
    journalMsg += prefix + command;

    console.log(journalMsg);
}

module.exports = {
    discordBot: client
}
