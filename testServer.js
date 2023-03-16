const{ Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')
var fs = require('fs');
var path = require('path');



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready',() => {
    console.log('Bot is online')
})

client.on('messageCreate',message => {

    var jsonPath = path.join(__dirname, 'botResponses.json');
    var obj = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    //Help command: shows all commands that the bot will respond to
    if (message.content == '!help'){
        var response = "```\n";
        for (var i = 0; i < obj.generalHelpCommands.length; i++) {
            response += obj.generalHelpCommands[i] + "\n";
        }

        response += "\n";
        for (var i = 0; i < obj.partyCommands.length; i++) {
            response += obj.partyCommands[i] + "\n";
        }

        response += "\n";
        for (var i = 0; i < obj.cleanupGroupCommands.length; i++){
            response += obj.cleanupGroupCommands[i] + "\n";
        }

        response += "\n```"
        console.log("Actives List Requested")
        message.reply(response);
    }

    //Actives list
    if (message.content === '!actives'){
        let formattedNames = [];
        for (let i = 0; i < obj.activesList.length; i++) {
            let currentActive = obj.activesList[i];
            let currentActiveFormatted = `${currentActive.id} ${currentActive.name}`;
            formattedNames.push(currentActiveFormatted);
        }

        let response = createTable(formattedNames, 2);

        message.reply(response);
    }

    //TT Schedule
    if (message.content == "!schedule"){
        message.reply('TODO: Add schedule')
    }

    //Door code
    if (message.content == '!door'){
        message.reply("```\n" + obj.doorCode + "\n```")
    }

    //Calendar
    if (message.content == '!calendar'){
        let formattedEvents = [];
        for (let i = 0; i < obj.calendar.length; i++) {
            let currentEvent = obj.calendar[i];
            let currentEventFormatted = `${currentEvent.date} ${currentEvent.message}`;
            formattedEvents.push(currentEventFormatted);
        }

        let response = createTable(formattedEvents, 1);

        message.reply(response);
    }

    //Cleanup group 1
    if (message.content == '!group1'){
        var response = "```\n";

        for (var i = 0; i < obj.cleanupGroup1.length; i++){
            response += obj.cleanupGroup1[i] + "\n";
        }
        response += "\n```"
        message.reply(response)
    }

    //Cleanup group 2
    if (message.content == '!group2'){
        var response = "```\n";

        for (var i = 0; i < obj.cleanupGroup2.length; i++){
            response += obj.cleanupGroup2[i] + "\n";
        }
        response += "\n```"
        message.reply(response)
    }

    //Cleanup group 3
    if (message.content == '!group3'){
        var response = "```\n";

        for (var i = 0; i < obj.cleanupGroup3.length; i++){
            response += obj.cleanupGroup3[i] + "\n";
        }
        response += "\n```"
        message.reply(response)
    }

    //Cleanup group 4
    if (message.content == '!group4'){
        var response = "```\n";

        for (var i = 0; i < obj.cleanupGroup4.length; i++){
            response += obj.cleanupGroup4[i] + "\n";
        }
        response += "\n```"
        message.reply(response)
    }

    //pledges
    if (message.content == '!pledges'){
        let formattedPledgeInfo = [];
        for (let i = 0; i < obj.pledges.length; i++) {
            let currentPledgeInfo = obj.pledges[i];
            let currentEventFormatted = `${currentPledgeInfo.name}: ${currentPledgeInfo.major} ${currentPledgeInfo.phoneNumber}`;
            formattedPledgeInfo.push(currentEventFormatted);
        }

        let response = createTable(formattedPledgeInfo, 2);

        message.reply(response);
    }

    //Standards
    if (message.content == '!standards'){
        message.reply(obj.standardsLink)
    }

    //Door shift
    if (message.content == '!doorshift'){
        var response = "```\n";
        var spacer = "          ";
        var namesPerRow = 1;
        for (var i = 0; i < obj.doorShift.length; i++){
            var currentTime = obj.doorShift[i];
            response += `${currentTime.time} ${currentTime.names}`;
            if (i == obj.doorShift.length -1){
                continue;
            }
            if ((i + 1) % namesPerRow == 0){
                response += "\n";
            }
            else {
                response += spacer; 
            }
        }
        response += "\n```"
        message.reply(response);
    }
   
    //Bar shift
    if (message.content == '!bar'){
        var response = "```\n";
        var spacer = "          ";
        var namesPerRow = 1;
        for (var i = 0; i < obj.barShift.length; i++){
            var currentTime = obj.barShift[i];
            response += `${currentTime.time} ${currentTime.names}`;
            if (i == obj.barShift.length -1){
                continue;
            }
            if ((i + 1) % namesPerRow == 0){
                response += "\n";
            }
            else {
                response += spacer; 
            }
        }
        response += "\n```"
        message.reply(response);
    }

    //wifi
    if (message.content == '!wifi'){
        message.reply("```\n" + obj.wifiPassword + "\n```")
    }
    
    
})


client.login(process.env.TOKEN)

function createTable(items, itemsPerRow, spacing = "    ") {
    let tableStr = "```\n";

    var longest = items.reduce(
        function (a, b) {
            return a.length > b.length ? a : b;
        }
    );
    
    let longestStartLength = longest.length;

    for (let i = 0; i < items.length; i++) {
        let currentFormatted = items[i];
        
        tableStr += currentFormatted;

        if((i + 1) % itemsPerRow === 0) {
            tableStr += "\n";
        } else {
            tableStr += " ".repeat(longestStartLength - currentFormatted.length);
            tableStr += spacing;
        }
    }

    return tableStr + "\n```";
}
