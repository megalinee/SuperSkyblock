const Discord = require('discord.js');

var request = require('request')

const fs = require('fs');

var prefix = "!"

const now = require('performance-now')

var banlist = ["159786786241904640", "156914429638737920"]

const bot = new Discord.Client();

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

bot.on('message', msg => {

    var input = msg.content.toLowerCase();

    if (input.startsWith(prefix + 'play') || input.startsWith('added')) {
        if (msg.author.bot === "false") return;
        setTimeout(function() {
            msg.delete()
        }, 30000);
    }

    if (input.startsWith(prefix + "info")) {
        var author;
        if (!msg.mentions.users.first()) author = msg.author
        if (msg.mentions.users.first()) author = msg.mentions.users.first()
        const embed = new Discord.RichEmbed()
            .setTitle('Info about ' + author.username)
            .setAuthor(author.username, author.avatarURL)
            .setColor(0x00AE86)
            .setFooter('Super Skyblock | ' + new Date, bot.user.avatarURL)
            .setThumbnail(author.avatarURL)
            .setURL('http://sskyblock.com/')
            .addField('Date account made', author.createdAt)
            .addField('Author ID', author.id, true)
            .addField('This is in beta', 'This bot is in beta', true);

        msg.channel.sendEmbed(
            embed,
            '', {
                disableEveryone: true
            }
        );
    }
    if (input.startsWith(prefix + "eval")) {

        if (msg.author.id === "115487467783716873" || msg.author.id === "94636068057382912") {

            var code = msg.content.split(" ").splice(1).join(" ")

            try {


                msg.channel.sendMessage("​`\`\`xl\n" +
                    "The Result· " + eval(code) + "​`\`\`");



            } catch (err) {

                msg.channel.sendMessage(
                    "`\`\`xl\n" +
                    "Error· " + err + "`\`\`")

            }
        }
    }
    if (input.startsWith(prefix + "c create")) {
        var mes = msg.content.split(" ").slice(2).join(" ");
        msg.guild.createChannel(msg.author.username + "'s channel (" + msg.author.id + ")", 'voice')
        msg.guild.createChannel(msg.author.username + "'s channel (" + msg.author.id + ")", 'text')
            .then(channel => msg.channel.sendMessage('Created new channel ' + channel + `.`))
            .catch(console.error);
        msg.guild.channels.find("name", msg.author.username + "'s channel (" + msg.author.id + ")").overwritePermissions(msg.guild.id, {
                CONNECT: false
        })
        setTimeout(function() {
            msg.guild.channels.find("name", msg.author.username + "'s channel (" + msg.author.id + ")").overwritePermissions(msg.author.id, {
                CONNECT: true
            })
        msg.guild.channels.find("name", msg.author.username + "'s channel (" + msg.author.id + ")").overwritePermissions(msg.guild.id, {
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false,
            READ_MESSAGES: false
        })
            msg.guild.channels.find("name", msg.author.username + "'s channel (" + msg.author.id + ")").overwritePermissions(msg.author.id, {
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
                READ_MESSAGES: true
            })
        }, 500);
    }
    if (input.startsWith(prefix + "help")) {
        const embed = new Discord.RichEmbed()
            .setTitle('Help')
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setColor(0x00AE86)
            .setFooter('Super Skyblock | ' + new Date, bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .setURL('http://sskyblock.com/')
            .addField('Server IP', 'play.SSkyblock.com')
            .addField('Our goal:', 'Our goal as a server is to bring the most unique and enjoyable experience of any skyblock server ever!', true)
            .addField('Islands', 'With our variety of custom islands and unlimited resets of your island, never get bored!', true)
            .addField('Commands', 'The two commands so far are !vc and !info.\n What !vc does is it creates your own custom voice channel, \nand when you create a voice channel you use !vc invite to invite people to your channel.')
            .addField('Donor Ranks', 'For the full list go to http://sskyblock.com/forums/index.php?threads/what-is-super-skyblock.4/');

        msg.channel.sendEmbed(
            embed,
            '', {
                disableEveryone: true
            }
        );
    }
    if (input.startsWith(prefix + 'c invite')) {
      var mentions = msg.mentions.users.first()
      if(mentions === "undefined") return msg.channel.sendMessage("Please mention a user to invite them!")
      msg.guild.channels.find("name", msg.author.username + "'s channel (" + msg.author.id + ")").overwritePermissions(mentions, {
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true,
          READ_MESSAGES: true
      })
      msg.guild.channels.find("name", msg.author.username + "'s channel (" + msg.author.id + ")").overwritePermissions(mentions, {
          CONNECT: true
      })
      mentions.sendMessage("Hello Super Skyblock player! You have been invited to the team " + )
      msg.channel.sendMessage("I have gaven member " + mention.username + " a message notifying him you have been invited.")
    }
});

bot.login('MzAxMzM0NjEwODI5MjQ2NDY0.C85fOw.lwM0k8rfQ78P6yKUdTGMZ6uHpQ0')
