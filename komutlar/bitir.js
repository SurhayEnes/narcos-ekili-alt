const ms = require('rhino-ms')
const discord = require('discord.js')
exports.run = async (client, message, args) => {
 if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            İzniniz yok
                        `))
        }
        else
        {
            if(!args[0]){
                message.channel.send(new discord.MessageEmbed().setDescription(`
                Lütfen geçerli bir mesaj kimliği belirtin.
                                `))
            }
            else
            {
                let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

                if(!giveaway){
                    return message.channel.send(new discord.MessageEmbed().setDescription(`
                    İçin bir hediye bulamıyorum \`${args.join(' ')}\`
                    
                    `));
                }
                else
                {
                    client.giveawaysManager.edit(giveaway.messageID, {
                        setEndTimestamp: Date.now()
                    }).then(() => {
                        message.channel.send(new discord.MessageEmbed().setDescription(`
                        Çekiliş daha sonra bitecek:

                        ${(client.giveawaysManager.options.updateCountdownEvery/1000)} seconds.
                        `))
                    })
                    .catch((e) => {
                        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                            message.channel.send(new discord.MessageEmbed().setDescription(`
Bu hediye çoktan sona erdi.
                            `));
                        }
                        else {
                            console.error(e);
                            message.channel.send(new discord.MessageEmbed().setDescription(`
                            Bir hata oluştu...
                                                        `))
                        }
                    })



}}}
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
}

exports.help = {
  name: 'bitir'
};
