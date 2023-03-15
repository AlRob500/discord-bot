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
        message.reply(        'General: \n!calendar \n!actives \n!pledges \n!door \n!wifi \n!standards' 
                        + '\n\nParties: \n!doorshift \n!bar' 
                        + '\n\nCleanup Groups: \n!group1: \n!group2: \n!group3: \n!group4')
    }

    //Actives list
    if (message.content === '!actives'){
        console.log(obj.activesList)
        var response = "";
        var spacer = "\t\t\t";

        for (const actives of obj.activesList) {
            
        }
        //message.reply(obj.activesList);
        // message.reply(      'Σ1016 Gaven        Σ1017Alec' 
        //                 + '\nΣ1022 Franco      Σ1032 Gary'
        //                 + '\nΣ1034 Max           Σ1036 Cam'
        //                 + '\nΣ1037 Lambert   Σ1038 Jack'
        //                 + '\nΣ1039 Gamer       Σ1040 Nick V.'
        //                 + '\nΣ1041 Connor       Σ1042 Zach'
        //                 + '\nΣ1043 Travis          Σ1044 Nick G.'
        //                 + '\nΣ1045 Bryce          Σ1046 Oliver'
        //                 + '\nΣ1047 Jake             Σ1048 Noah' 
        //                 + '\nΣ1049 Tej                Σ1051 Steven'
        //                 + '\nΣ1052 Rob              Σ1053 Aaron Shu.'
        //                 + '\nΣ1054 Omer           Σ1055 Peter'
        //                 + '\nΣ1056 Andy            Σ1057 Nic'
        //                 + '\nΣ1058 Jacob K.      Σ1059 Juhan'
        //                 + '\nΣ1060 Aaron Sta.  Σ1061 Mitchell (Thomas)'
        //                 + '\nΣ1062 Jacob M.     Σ1063 Graham'
        //                 + '\nΣ1064 Luke             Σ1065 Nate H.')
    }

    //TT Schedule
    if (message.content == "!schedule"){
        message.reply('TODO: Add schedule')
    }

    //Door code
    if (message.content == '!door'){
        message.reply('3969')
    }

    //Calendar
    if (message.content == '!calendar'){
        message.reply('TODO: Add calendar')
    }

    //Cleanup group 1
    if (message.content == '!group1'){
        message.reply('TODO: Add Cleanup group 1')
    }

    //Cleanup group 2
    if (message.content == '!group2'){
        message.reply('TODO: Add Cleanup group 2')
    }

    //Cleanup group 3
    if (message.content == '!group3'){
        message.reply('TODO: Add Cleanup group 3')
    }

    //Cleanup group 4
    if (message.content == '!group4'){
        message.reply('TODO: Add Cleanup group 4')
    }

    //pledges
    if (message.content == '!pledges'){
        message.reply('TODO: Add list of pledges')
    }

    //Standards
    if (message.content == '!standards'){
        message.reply('https://docs.google.com/forms/d/e/1FAIpQLScXktdcrC3qgcrLQ3j-ZOhcSvsGH2MUWHpwfQrwn8L57C3SuQ/viewform')
    }

    //Door shift
    if (message.content == '!doorshift'){
        message.reply('TODO: Add door shift info')
    }
   
    //Bar shift
    if (message.content == '!bar'){
        message.reply('TODO: add bar shift info')
    }

    //wifi
    if (message.content == '!wifi'){
        message.reply('bdtc1924')
    }
    
    
})


client.login(process.env.TOKEN)
