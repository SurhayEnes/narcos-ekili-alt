const ms = require('rhino-ms')
const discord = require('discord.js')
exports.run = async (client, message, args) => {
 if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(new discord.MessageEmbed().setDescription(`
             Bunu Yapmaya İzniniz Yok
            `))
        }
        else
        {
            if(!args[0]){
                return message.channel.send(new discord.MessageEmbed().setDescription(`
                Geçerli bir mesaj kimliği belirtmeniz gerekiyor.
                `));
            }
        
            
            let giveaway = 
            
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
        
            
            if(!giveaway){
                return message.channel.send(new discord.MessageEmbed().setDescription(`
                Şunun için hediye bulunamıyor:

                    \`${args.join(' ')}\`
                `));
            }
        
            
            client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                
                message.channel.send(message.channel.send(new discord.MessageEmbed().setDescription(`
Çekiliş yeniden düzenlendi.
                `)));
            })
            .catch((e) => {
                if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                    message.channel.send(message.channel.send(new discord.MessageEmbed().setDescription(`
                    Bu Çekiliş bitmedi.
                                        `)));
                } else {
                    console.error(e);
                    message.channel.send(new discord.MessageEmbed().setDescription(`
                    Bir hata oluştu.
                                        `));
                }
            });

        }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
}

exports.help = {
  name: 'reroll'
};