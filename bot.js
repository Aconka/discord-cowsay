var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');
var blacklist = require('./blacklist.json');
var program = require('commander');
var util = require('util')

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
             .option('-e <eyes>', 'eyes for the cow')
             .option('-T <tongue>', 'Add bbq sauce')
             //need to figure out how to do mode
             .parse(text);
        
        text = String(program.args); //text to display is not used be otions so this is an easy way to filter out the options
        text = text.replace(/```/g, '\'\'\'');
        
	//hank debug stuff
	console.log(text);
	console.log(program.e);
	console.log(program.T);
	console.log(util.inspect(program));
	//end debug


        var cowSaid = cowsay.say({
            text: text,
            e: program.e,
            T: program.T,
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
             .option('-e <eyes>', 'eyes for the cow')
             .option('-T <tongue>', 'Add bbq sauce')
             //need to figure out how to do mode 
             .parse(text);
              
         
         text = String(program.args); //text to display is not used be otions so this is an easy way to filter out the options
         text = text.replace(/```/g, '\'\'\'');

	//hank debug stuff
	console.log(text);
	console.log(program.e);
	console.log(program.T);
	console.log(util.inspect(program));
	//end debug

        var cowSaid = cowsay.think({
            text: text,
            e: program.e,
            T: program.T,
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
