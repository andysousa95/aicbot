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
  
  let blackListed = ['pinto', 'buceta', 'filho da puta', 'nigga', 'viado', 'deyde', 'piroca', 'mongoloide', 'vai tomar no cu', 'vtnc', 'trouxa'];
  let procuraTexto = false;
  for(var i in blackListed) {
    if(message.content.toLowerCase().includes(blackListed[i.toLowerCase()])) procuraTexto = true;
    }
    if(procuraTexto){
      await message.delete();
      await message.channel.send(`Mandou mal ${message.author}, pare com o thrash talk e foque no jogo!`);
    };
    
    const comandos = [' !comandos', ' !bot', ' !twitch', ' !youtube ', ' !jogonba'];
    const botMsg = "Olá! Sou o AIC Bot e irei te auxiliar a gerenciar este servidor no Discord, qualquer coisa é só me chamar ;).";
    const twt = "Nosso canal na Twitch: https://www.twitch.tv/alexisidorochannel";
    const ytb = "Nosso canal no Youtube: https://www.youtube.com/c/AlexIsidoro";
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

    const guild = bot.guilds.cache.get('699042573989183538');
    const welcomeChannel = bot.channels.cache.get('738582801628004372');
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
/*
bot.on('message', async (message) => {

if(message.content.startsWith('!rChannel')){
  const rulesChannel = bot.channels.cache.get('738582834335449141');
  const regras = await new Discord.MessageEmbed()
  .setColor("#000000")
  .setTitle(`**REGRAS DO SERVIDOR, LEIA TODAS E NÃO PULE NENHUMA**`)
  .setDescription(`
1 - É proibido qualquer tipo de preconceito, racismo, xenofobia, homofobia e qualquer tipo de ofensa, lembrem-se que somos iguais, independente de cor da pele ou estatura do corpo. Caso algum ADM ou algum membro da Staff veja a situação,  será advertido(a), caso haja reincidências o(a) mesmo(a) será banido(a);

2 - Sem spam ou flood nos canais(imagens, links e mensagens);

3 - Cada canal tem sua finalidade, o canal(voz e texto) de NBA deve-se falar apenas de NBA, o de NFL apenas de NFL e assim por diante. Mensagens de assuntos em canais incorretos, serão apagadas;

4 - Notícias enviadas DEVEM ser checadas para evitar Fake News, por gentileza, chequem antes de enviar nos canais, ou as mesmas serão apagadas(o mesmo vale para notícias tendenciosas);

5 - Zoeiras e provocações SÃO LIBERADAS DESDE QUE, NÃO VIRE BRIGAS E/OU DISCUSSÕES, caso aconteça os(as) envolvidos(as) serão advertidos(as), em caso de reincidências, o banimento será aplicado;

6 - Proibido CRITICAR LADO POLÍTICO E RELIGIOSO das outras pessoas, cada um vive sua vida da forma como bem entende, e não cabe a você decidir o que cada um segue, acredita ou crê. Respeito é bom e cabe em todos os lugares;

7 - Proibido qualquer tipo de pornografia, nudez e assuntos relacionados a este, caso aconteça o membro será advertido e sofrerá as devidas punições, e em caso de coisas absurdas as autoridades serão notificadas para tomar as devidas medidas judiciais. Não nos responsabilizamos pelo que vocês falam e postam nos canais do servidor.
=====================================================`)
.addField('**PUNIÇÕES**', `1 ª Advertência - Mute(canais de texto e áudio) de 20 minutos;
2 ª Advertência - Mute(canais de texto e áudio) de 40 minutos;
3 ª Advertência - Mute(canais de texto e áudio)  por 24 horas;
4 ª  Advertência - Banimento permanente do servidor.

Quaisquer dúvidas, por gentileza comunique o <@&699053134659453029>.

Obrigado a todos que leram @everyone.`);
rulesChannel.send(regras);
} 
});*/