// accident

const Discord = require("discord.js");
const YTDL = require("ytdl-core")

const bot = new Discord.Client({disableEveryone: true});

const PREFIX = ""

const result_images = [
  "https://vignette.wikia.nocookie.net/geometry-dash/images/2/28/SecretCoin.png/revision/latest?cb=20171218125026",
  "https://vignette.wikia.nocookie.net/geometry-dash/images/3/38/UserCoinVerified.png/revision/latest?cb=20171203235714",
  "https://vignette.wikia.nocookie.net/geometry-dash/images/a/a6/UserCoinConcept.png/revision/latest?cb=20150930055737"
];

const results = [
  "Heads",
  "Tails",
  "GUESS WHO WON THE LOTTERY???",
];

const result_colors = [
  "0xFFFF00",
  "0xC0C0C0",
  "0x00FFFF"
]

const result_footer = [
  "",
  "",
  "protip: you just won the lottery"
]

const rps_symbols = [
  "🌑",
  "📄",
  "✂",
  "🔫"
];

const rps_outcomes = [
  "winner winner chicken dinner",
  "accident",
  "looks like somebody is a MASSIVE scammer"
];


// start

var servers = {};

bot.on("ready", () => {
  console.log(`Total of ${bot.users.size} users, in ${bot.guilds.size} guilds.`);
  bot.user.setActivity(`geometrash with ${bot.guilds.size} servers`, {type: `PLAYING`});
});

// tagging


bot.on('message', message => {
  if (message.isMentioned(bot.user)) {
    message.reply("STOP TAGGING ME!!!!!!")
  }
});




// general

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
      case "ping":
        let ping = Math.round(bot.ping);
        message.channel.send(`🏓 Pong! \`${ping}ms\``);
        break;
      case "help":
        var embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setAuthor("Command List", "https://cdn2.scratch.mit.edu/get_image/gallery/1948491_200x130.png")
        .addField(`Fun`, `\`8ball\` \`rps\` \`coinflip\``)
        .addField(`Utility`, `\`ping\` \`info\` \`serverinfo\` \`channelinfo\` \`emotes\``, true)
        message.channel.send(embed);
        break;
      case "info":
        var totalSec = bot.uptime / 1000;
        var days = Math.floor(totalSec / 216000);
        var hours = Math.floor(totalSec / 3600);
        totalSec %= 3600;
        var mins = Math.floor(totalSec / 60);
        var secs = Math.floor(totalSec % 60);
        var ram = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
        var embed = new Discord.RichEmbed()
        .setTitle("a not very good bot by a not very smart person  ~~(bot by pwngu)~~", "")
        .setURL("https://discord.gg/dYmku7D")
        .setDescription("probably for personal usage, goal is to actually make this stupid thing functional")
        .setColor(0xFFFF00)
        .setTimestamp(new Date())
        .setFooter(`made by ("pwngu")#1290`, "https://applech2.com/wp-content/uploads/2018/05/nodeScratchpad-logo-icon.jpg")
        .setThumbnail("https://cdn.discordapp.com/attachments/428763604880457731/485700383486771201/discord.png")
        .setAuthor("pengu", "https://cdn2.scratch.mit.edu/get_image/gallery/1948491_200x130.png", "https://discord.gg/dYmku7D")
        .addField("Stats", `Servers: \`${bot.guilds.size}\`` + '\n' +
      `Users: \`${bot.users.size}\`` + '\n' +
      `Channels: \`${bot.channels.size}\`` + '\n' +
      `Uptime: \`${days} days, ${hours} hours, ${mins} minutes, and ${secs} seconds\`` + '\n' +
      `RAM: \`${ram}MB\``
        , false)
        .addField("Usage", `To get started, type "help" to see my list of commands`)
        .addField("Bot Invite", `Click [here](https://discordapp.com/oauth2/authorize?client_id=266691925850062849&scope=bot&permissions=8) to invite this bot to your server!`)
        .addField("Support", `To report a bug or request help, join the [support server](https://discord.gg/dYmku7D)` + `\n` +
        `You may also alternatively message ("pwngu")#0281`, true)
        message.channel.send(embed);
        break;
      case "serverinfo":
        var embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setTimestamp(new Date())
        .setFooter(`made by ("pwngu")#4092`, "https://applech2.com/wp-content/uploads/2018/05/nodeScratchpad-logo-icon.jpg")
        .setTitle(`${message.guild.name} is a server that is owned by ${message.guild.owner.displayName} with a total of ${message.guild.memberCount} members!`)
        .setURL(`https://discord.gg/dYmku7D`)
        .setThumbnail(`${message.guild.iconURL}`)
        .setAuthor(`${message.guild.name}`, "https://cdn2.scratch.mit.edu/get_image/gallery/1948491_200x130.png", "")
        .addField("Server Info", `Name: \`${message.guild.name}\`` + '\n' +
      `Server ID: \`${message.guild.id}\`` + '\n' +
      `Owner: \`${message.guild.owner.displayName}\`` + '\n' +
      `Members: \`${message.guild.memberCount}\`` + '\n' +
      `Region: \`${message.guild.region}\``
        , false)
        message.channel.send(embed);
        break;
      case "channelinfo":
        var ch;
        if (message.mentions.channels.first() !== undefined) {
          ch = message.mentions.channels.first();
        } else {
          ch = message.channel;
        }
        var embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setAuthor(`#${ch.name} | Info`, "https://cdn2.scratch.mit.edu/get_image/gallery/1948491_200x130.png")
        .setDescription(`Name: \`${ch.name}\`` + '\n' +
      `Channel ID: \`${ch.id}\`` + '\n' +
      `Topic: \`${message.channel.topic}\`` + `\n` +
      `Creation Date: \`${ch.createdAt}\`` + '\n' +
      `Users: \`${ch.members.size}\``)
        message.channel.send(embed);
        break;
      case "emotes":
        let emotes = message.channel.guild.emojis.array(e => `:${e.name}:`).join('  ')
        var embed = new Discord.RichEmbed()
          .setAuthor(`${message.guild.name} emotes`, "https://cdn2.scratch.mit.edu/get_image/gallery/1948491_200x130.png")
          .setDescription(emotes)
          .setColor(0xFFFF00)
          .setTimestamp(new Date())
          .setFooter(`Total of ${message.guild.emojis.size} emotes`)
          message.channel.send(embed);
          break;
      case "coinflip":
        var min = 1;
        var max = 175000000
        var chance = Math.floor(Math.random() * (max - min + 1)) + min;
        var embed = new Discord.RichEmbed()
        let result;
        let image;
        if (chance > 87500001) {
          result = results[0];
          image = result_images[0];
          colors = result_colors[0];
          footer = result_footer[0];
        }
        else if (chance > 2) {
          result = results[1];
          image = result_images[1];
          colors = result_colors[1];
          footer = result_footer[1];
        }
        else {
          result = results[2];
          image = result_images[2];
          colors = result_colors[2];
          footer = result_footer[2]
        }
        var embed = new Discord.RichEmbed()
          .setAuthor(result)
          .setImage(image)
          .setColor(colors)
          .setFooter(footer)
          message.channel.send(embed);
          break;
      case "8ball":
        if (message.content == ('8ball')) {
          let log = `someone did not ask a QUESTION`;
          message.reply(`you need to actually need to ask something`)
          .then(console.log(log))
          .catch(console.error);
          return log;
        }
        const fortune = [
        "deifjntly!!!",
        "im not racist, but im certain",
        "when in doubt, always buy lincoln logs",
        "Yes",
        "most likely!!!",
        "i smell a yes answer",
        "srry i need to turn on my brain, try again",
        "srry im going to have to scam you, try again",
        "im not a prophet!!! stop asking me!!!",
        "novbdy cafres!!!!!",
        "Bet",
        "srry i dont think so kid",
        "not to be racist or anything, but novbdy cafres!!!",
        "Nope",
        "Maybe",
        "Try Again"
      ];
        var min = 0;
        var max = fortune.length - 1;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var embed = new Discord.RichEmbed()
          .setColor(0xFFFFFF)
          .setAuthor(`pengu's "magic" 8-ball`, "https://cdn.discordapp.com/attachments/428763604880457731/487760812799295500/8ball.png")
          .addField(`**Answer**`, fortune[random], false)
          message.channel.send(embed)
          break;
      case "9ball":
        if (message.content == ('9ball')) {
          let log = `some did a incorrect`;
          message.reply('HELLO??? YOU DISGUSTING NIFAJIT!!! YOU NEED TO ASK SOMETHING!')
          .then(console.log(log))
          .catch(console.error);
          return log;
        }
        var fortunes = [
          "JUST BUY AN 8BALL YOURSELF CHEAP KID",
          "ILL TELL YOU ONCE I GET MY VBUCKS NOW!!!!",
          "NOBODY CARES!!!! PUNBG NJIOW!!!!!!",
          "UR DEIFNTLY A MINON FAN",
          "WJAHT DO YIU M EAMN???? UDIOPATE 2.2 ISK NEVER COMNING OUT!!!!!!!!!!!",
          "WHO ARE YOU TRYING TOI SCAM????",
          "NOVBDY CAFRES!!!! IM BACK!!!!!!!",
          "?????? Gift for my Subscribers Click Here: ??? http://us.baptizing868hd.top/amazongo/index_h.html?model=iPhone&brand=Apple&osversion=IOS%2011.3&ip=166.137.252.60&city=New%20York&voluumdata=deprecated&eda=deprecated&cep=0oWLKQbS1T9RixRYjRRtbsr3N5-1a30Z2c8aBHX2WbN9ufu1fkikKwGQeGMTRXJ7YXzTdqOGK4Hs25CoEDk8JAv6uWoKjiD-e5hHZ3uxJ9ydx3yxO-Mhzuq7taZIvzJDOD2HN1LaD44qfBdLN5RZaWAbwBiPzMuU5Ag1Iljzk6428Bn6ZIghu7Kw15RuFsRyrSPF1_-m8wQT-3V3RyayGWWnurVDvRuUVq5bZcuDtrncJGV6iOm9jJDIPBkaU-QCmNegyZ2nlP89vOCnlaGARqQDdcQM7qzjwBjfZEUh8YrLrcAbnVWtE7vgiKCL3RwhVm2RchOgW83MKSdZGBaOVwBShqAAaMhKT3YIYeTjMPHmfHmxZuEDJD5fdzT4dw3D&clickid=aeeae6c572a79a17f6d613a6cf46eadd&channel_id=justflipacoin.com_119450&rtb_source=A4g_sunny0507_pp_ios&campaign_id=4585041&sizeid=32050&mediaid=pulsepoint",
          "I AGREE, I AGREE SO MUCH!!!!!",
          "HAHHA MORE LIKE MASTERPLAYS LOVES DICK IN HIS MOUTH",
          "WHAT THE FUCK IS WRONG WITH YOU?????",
          "BE SURE TO JOIN MY AWESOME SERVER: https://discord.gg/dYmku7D",
          "YOU ARE UNBELIEVABLE. IM NOT ANSWERING UR CHEAP QUESTIONS!!!!!",
          "WHAT ARE YOU TALKING ABOUT I ALREADY KNOW KOTA LOVES MEN",
          "My number boys, Text Me :) 7342772307",
          "ARE YOU HAVE MANY  STUPID?????",
          "HAHAHAHAHA IM NOT ANSWERING BIG SCAMMERS",
          "ARE YOU A SHEEP OR SOMETHING?????",
          "WHO EVEN ARE YOU KID??? ALL YOU DO IS POST AT 11:11 DISGUSTIJNG NIFAJIT!!!",
          "BLACK LIVES MATTER??? MORE LIKE NOBODY MATTERS HAHAHAHAHHA",
          "YE S  IKJOWW PANDA WATCHES RWBY LEIFKE A BFIG LOSSER",
          "PWNGU LIKES FEMALES!!!! U DIGUSTING KID",
          "THIS IS UNBEGIALBLE",
          "WHY ARE YOU ASKING ME KID????",
          "WHAT ARE YOU ASKING ME FOR???",
          "DO YOU HAVE A BETTER QUESTION??? U DISGUSTING KID",
          "good question",
          "Why would you say something so controversial, yet so brave?",
          "NOBOGFYD CAFERS!!!!! KILL THE WHALES NOW!!!",
          "NOT TO BE RACIST OR ANYTHING, BUT NOLVBKDY CAFRES!!!!!!!!",
          "OH IM SRRY, ARE YOU ENTITLED TO AN ANSWER??? TOO BAD NIFAJIT!!! AHHAAHAHHAHAHAHA",
          "Yes.",
          "No.",
          "Try again.",
          "Probably",
          "WHAT???",
          "WHO IS TAGGING ME????",
          "WHAT DID I JUST SAY??? NO ACE ATOTONREY!!!!!",
          "OF COURSE MASTER LIKES BOYS!!! HE LIKES BIG PEEPEE IN MOUTH!!!",
          "MORE LIKE, PWNGU IS NEVER RELEASING A NEW LEVEL!!!!",
          "MORE LIKE WOOGI141 IS NEVER RELEASING HIS NEW **HARD** LEVEL!!!!!!!",
          "WYATCH OUT RL YO UMIFH END UDP EWJTH A SHEEP",
          "BRO CHILL WITH THE RACISM",
          "WHOA!!! CHILL KID",
          "STOP ASKING ME THESE DIRTY QUESTIONS!!!!!",
          "You know what, Fuck You, I don't care what you say. I want to kill the whales.",
          "Awesome buddy! Be sure to check out my YouTube: https://www.youtube.com/c/pwngu",
          "Be sure to donate my Paypal at mathematicalmagician@gmail.com",
          "use this link when pwngu streams: https://streamlabs.com/pengulengu",
          "NOBODY CARES!!!! STREAKS NOW!!!"
        ];
        var min = 0;
        var max = fortunes.length - 1;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var embed = new Discord.RichEmbed()
          .setColor(0xFFFFFF)
          .setAuthor(`pengu's incredible and magical 9-ball`, "https://cdn.discordapp.com/attachments/428763604880457731/487763090306367498/9ball.png")
          .addField(`**Answer**`, fortunes[random], false)
          message.channel.send(embed)
          break;
      case "robtop":
        message.channel.send(`<:1_:471087645481631744><:2_:471087645259464725>` + `\n` +
        `<:3_:471087645506928660><:4_:471087645590814720>`)
        break;
      case "rps":
        let rps_choice = message.content.substring((`rps `).length);

        if (rps_choice != 'r' && rps_choice != 'p' && rps_choice != 's' && rps_choice != 'g' && rps_choice != 'gun' && rps_choice != 'rock' && rps_choice != 'paper' && rps_choice != 'scissors' && rps_choice != 'scissor') {
          let log = `someone didnt do rps correctly`;
          message.reply(`you need to choose something`)
          .then(console.log(log))
          .catch(console.error);
          return log;
        }

        if (rps_choice == 'r')  {
          rps_choice = rps_symbols[0];
        }
        else if (rps_choice == 'p') {
          rps_choice = rps_symbols[1];
        }
        else if (rps_choice == 's') {
          rps_choice = rps_symbols[2];
        }
        else if (rps_choice == 'g') {
          rps_choice = rps_symbols[3];
        }
        else if (rps_choice == 'gun') {
          rps_choice = rps_symbols[3];
        }
        else if (rps_choice == 'rock') {
          rps_choice = rps_symbols[0];
        }
        else if (rps_choice == 'paper') {
          rps_choice = rps_symbols[1];
        }
        else if (rps_choice == 'scissor') {
          rps_choice = rps_symbols[2];
        }
        else if (rps_choice == 'scissors') {
          rps_choice = rps_symbols[2];
        }

        var min = 0;
        var max = 2;
        var bot_rps_choice = rps_symbols[Math.floor(Math.random() * (max - min + 1)) + min];
        var bot_like = Math.floor(Math.random() * (max - min + 1)) + min;

        var embed = new Discord.RichEmbed()
        .setColor(0xFFFFFF)
        .setAuthor(`rock, paper, scissors!!!`)
        .addField(`your pick`, rps_choice, true)
        .addField(`pengu's pick`, bot_rps_choice, true)

        if (rps_choice == rps_symbols[0] && bot_rps_choice == rps_symbols[2] ||
            rps_choice == rps_symbols[1] && bot_rps_choice == rps_symbols[0] ||
            rps_choice == rps_symbols[2] && bot_rps_choice == rps_symbols[1]) {
              embed.addField('Results', rps_outcomes[0]);
              embed.setColor(0x00FF00)
            }
            else if (rps_choice == rps_symbols[0] && bot_rps_choice == rps_symbols[0] ||
                     rps_choice == rps_symbols[1] && bot_rps_choice == rps_symbols[1] ||
                     rps_choice == rps_symbols[2] && bot_rps_choice == rps_symbols[2]) {
                       embed.addField('Results', rps_outcomes[1]);
                       embed.setColor(0xFFFFFF)
                     }
                     else if (rps_choice == rps_symbols[3] && bot_rps_choice == rps_symbols[0] ||
                              rps_choice == rps_symbols[3] && bot_rps_choice == rps_symbols[1] ||
                              rps_choice == rps_symbols[3] && bot_rps_choice == rps_symbols[2]) {
                                embed.addField('Results', rps_outcomes[2]);
                                embed.setColor(0xFFFF00)
                              }
        else {
          embed.addField('Results', `so sad :( , can this hit ${bot_like} likes`);
          embed.setColor(0xFF0000)
        }

        message.channel.send(embed);
          break;
      case "profile":
        let array_of_mentions = message.mentions.users.array();
        if (array_of_mentions.length == 1 && message.mentions.user.first().avatar != null) { 
          var embed = new Discord.RichEmbed()
          .setAuthor(`${message.mentions.user.first()'s profile`, `https://cdn2.scratch.mit.edu/get_image/gallery/1948491_200x130.png`}
          .setThumbnail(message.mentions.user.first().avatarURL)
          ;
          message.channel.send(embed)
          break;
      case "oh no": 
    }
  
});


bot.login(process.env.BOT_TOKEN)
