//Main Modules
const Discord = require("discord.js");

//Other Modules
var request = require('request');

//API Clients
const bot = new Discord.Client();

//Config
bot.config = require("./config/config.json");

//API Login
bot.login(process.env.D_APIKey || bot.config.token);

//Error
process.on("uncaughtException", function(err) {
    console.log("Process Error: " + err);
});

bot.on("error", e => { console.error(e); });

//Events
bot.on("ready", ready => {
  console.log(`The web hook bot has logged in as ${bot.user.username}#${bot.user.discriminator}`);
});

//Commands
bot.on("message", message => {
    if (message.author.bot || !message.content.startsWith(bot.config.prefix)) { return; }
    let command = message.content.split(" ")[0].toLowerCase();
    command = command.slice(bot.config.prefix.length);
    let args = message.content.split(" ").slice(1);

    if (command === "get") {
      message.delete().catch(console.error);
      message.guild.fetchWebhooks().then(webhook => webhook.forEach(function(value, key, mapObj) {message.author.send(`https://discordapp.com/api/webhooks/${Object.values(value)[3]}/${Object.values(value)[1]}`).catch(console.error)}))
    } else

    if (command === "make") {
      message.delete().catch(console.error);
      message.channel.createWebhook('WebhookMaster').catch(console.error);
    } else 
    
    if (command === "send") {
        message.delete().catch(console.error);
        let options = {
            url: args[1],
            method: 'POST',
            form: {"content": args[1], "username": "username"}
        }.then(request(options))
    }
});
