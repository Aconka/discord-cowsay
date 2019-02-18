var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');
var blacklist = require('./blacklist.json');
var program = require('commander');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log('Connected');
});

var helpText = "Tell me to say something by\n" +
               "typing: cowsay <message>\n\n" +
               "Also try: cowthink <message>";
var deniedText = "I'm sorry, I will not say that.";

bot.on('message', message => {
    if (message.content.startsWith('cowsay')||message.content.startsWith('Cowsay')) {
        var text = message.content.substring('cowsay'.length + 1);
        console.log("Request received");
        if (blacklist.indexOf(message.author.id) != -1) {
            console.log("User is blacklisted. Request will be denied.");
            text = deniedText;
        }

        if (text == "")
            text = helpText;

         //cli parsing
          program
            .version('0.1.0')
             .option('-f, --cow <cow>', 'cowfile')
             .option('-e, --eyes <eyes>', 'eyes for the cow')
             .option('-T, --tongue <tongue>', 'Add bbq sauce')
             .option('-n, --wrap <wrap>', 'will message get word wrapped')
             .option('-W, --wrapLength <wrapLength>', 'when to wrap')
             //need to figure out how to do mode
             .parse(text);
        
        text = String(program.args); //text to display is not used be otions so this is an easy way to filter out the options
        text = text.replace(/```/g, '\'\'\'');
        
        var cowSaid = cowsay.say({
            text: text,
            cow: program.cow,
            eyes: program.eyes,
            tongue: program.tongue,
            wrap: program.wrap,
            wrapLength: program.wrapLength
        });

        message.channel.send('```' + cowSaid + '```');
        console.log("Message sent");
    }
    else if (message.content.startsWith('cowthink')||message.content.startsWith('Cowthink')) {
        var text = message.content.substring('cowthink'.length + 1);
        console.log("Request received");
        if (blacklist.indexOf(message.author.id) != -1) {
            console.log("User is blacklisted. Request will be denied.");
            text = deniedText;
        }
        if (text == "")
            text = helpText;

         //cli parsing
          program
            .version('0.1.0')
             .option('-f, --cow <cow>', 'cowfile')
             .option('-e, --eyes <eyes>', 'eyes for the cow')
             .option('-T, --tongue <tongue>', 'Add bbq sauce')
             .option('-n, --wrap <wrap>', 'will message get word wrapped')
             .option('-W, --wrapLength <wrapLength>', 'when to wrap')
             //need to figure out how to do mode 
             .parse(text);
              
         
         text = String(program.args); //text to display is not used be otions so this is an easy way to filter out the options
         text = text.replace(/```/g, '\'\'\'');

        var cowSaid = cowsay.think({
            text: text,
            cow: program.cow,
            eyes: program.eyes,
            tongue: program.tongue,
            wrap: program.wrap,
            wrapLength: program.wrapLength
        });

        message.channel.send('```' + cowSaid + '```');
        console.log("Message sent");
    }
});

var cleanupFn = function cleanup() {
    console.log("Logging off");
    bot.destroy();
}

process.on('SIGINT', cleanupFn);
process.on('SIGTERM', cleanupFn);
