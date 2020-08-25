const Discord = require("discord.js");
const bot = new Discord.Client();

const {prefix} = require("./config/config.json");
const express = require('express');
const fs = require("fs");
const app = express();

app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`AIC Bot entrou em quadra.`);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}\n`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
bot.login(process.env.TOKEN); 

bot.on('message', async (message) => {
  
  let blackListed = ['COLOQUE AS PALAVRAS QUE DESEJA TAXAR NO FILTRO'];
  let procuraTexto = false;
  for(var i in blackListed) {
    if(message.content.toLowerCase().includes(blackListed[i.toLowerCase()])) procuraTexto = true;
    }
    if(procuraTexto){
      await message.delete();
      await message.channel.send(`Mandou mal ${message.author}, pare com o thrash talk e foque no jogo!`);
    };
    
    const comandos = ['CUSTOMIZE AQUI SEUS COMANDOS'];
    const botMsg = "Olá! Sou o AIC Bot e irei te auxiliar a gerenciar este servidor no Discord, qualquer coisa é só me chamar ;).";
    const twt = "LINK DO SEU CANAL NA TWITCH";
    const ytb = "LINK DO SEU CANAL NO YOUTUBE";
    const nba = "Data: 25/08/2020\n\nNuggets x Jazz 19:30Hs;\nClippers x Mavericks 22:00Hs"

    if(message.content.startsWith('!comandos')){
      let embedComando = await new Discord.MessageEmbed()
      .setColor("#9605C7")
      .setTitle('**COMANDOS**\n')
      .setDescription(`Esses são os comandos do nosso server, ${message.author}\n **${comandos}**.`)
      .setTimestamp();
      await message.channel.send(embedComando);
  } else if(message.content.startsWith('!bot')){
          let embedBot = await new Discord.MessageEmbed()
          .setColor("#552583")
          .setTitle('**BOT**\n')
          .setDescription(`${message.author}\n **${botMsg}**.`)
          .setTimestamp();
          await message.channel.send(embedBot);    
        } else if(message.content.startsWith('!twitch')){
                let embedTwitch = await new Discord.MessageEmbed()
                .setColor("#552583")
                .setTitle('**TWITCH**\n')
                .setDescription(`${message.author}\n **${twt}**.`)
                .setTimestamp();
                await message.channel.send(embedTwitch); 
              } else if(message.content.startsWith('!youtube')){
                      let embedYoutube = await new Discord.MessageEmbed()
                      .setColor("#552583")
                      .setTitle('**YOUTUBE**\n')
                      .setDescription(`${message.author}\n **${ytb}**.`)
                      .setTimestamp();
                      await message.channel.send(embedYoutube);
                    } else if(message.content.startsWith('!jogonba')) {
                      let embedNba = await new Discord.MessageEmbed()
                      .setColor("#552583")
                      .setTitle('**SCHEDULE**\n')
                      .setDescription(`**${nba}**.`)
                      .setTimestamp();
                      await message.channel.send(embedNba);
                    }           
});

bot.on("guildMemberAdd", async (member) => {

    const guild = bot.guilds.cache.get('ID DO SEU SERVIDOR');
    const welcomeChannel = bot.channels.cache.get('CANAL QUE VC DESEJA ONDE A MESSAGEM SEJA ENVIADA');
    var role = member.guild.roles.cache.find(role => role.name === "Membro")

    if (guild != member.guild) {
        return console.log("Você não foi Draftado! Espere sua escolhe e depois volte.");
    } else {
        member.roles.add(role);
        let embed = new Discord.MessageEmbed()
            .setColor("#FDB927")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`**MAIS UM JOGADOR EM QUADRA**`)
            .setImage("https://media0.giphy.com/media/fdAeUVeqb5VUUigzBV/200.gif")
            .setDescription(`**Seja bem-vindo ${member.user}** ao ${member.guild.name}:D. Atualmente estamos com ${member.guild.memberCount} jogadores.`)
            .addField('REGRAS', 'Leia as nossas <#738582834335449141> ou o bot colocará você no banco :v , digite !comandos para ver a lista disponível.')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter('ID do usuário: ' + member.user.id)
            .setTimestamp();

        welcomeChannel.send(embed);
    }
});

bot.on('message', async (message) => {

if(message.content.startsWith('!rChannel')){
  const rulesChannel = bot.channels.cache.get('CANAL QUE VC DESEJA ONDE A MESSAGEM SEJA ENVIADA');
  const regras = await new Discord.MessageEmbed()
  .setColor("#000000")
  .setTitle(`**REGRAS DO SERVIDOR, LEIA TODAS E NÃO PULE NENHUMA**`)
  .setDescription(`COLOQUE AS REGRAS QUE DESEJA AQUI`);
rulesChannel.send(regras);
} 
});
