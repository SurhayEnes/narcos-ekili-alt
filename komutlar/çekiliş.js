const ms = require('rhino-ms')
const discord = require('discord.js')
exports.run = async (client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
         Bunu Yapmaya Yetkin Yok
    `));
}


let giveawayChannel = message.mentions.channels.first();

if(!giveawayChannel){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    Bir kanal bahsedin.

    Örnek Kullanım: \`n.çekiliş #giveaways 1d 10 Nitro Classic\`
    `));
}


let giveawayDuration = args[1];

if(!giveawayDuration || isNaN(ms(giveawayDuration))){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    Geçerli bir süre belirtmeniz gerekiyor.

    Örnek Kullanım: \`n.çekiliş #giveaways 1d 10 Nitro Classic\`
    `));
}


let giveawayNumberWinners = args[2];

if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
Lütfen geçerli bir kazanan belirtin.

     Örnek Kullanım: \`n.çekiliş #giveaways 1d 10 Nitro Classic\`
    `));
}


let giveawayPrize = args.slice(3).join(' ');

if(!giveawayPrize){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    Bir ödül belirtmeniz gerekiyor.

    Örnek Kullanım: \`n.çekiliş #giveaways 1d 10 Nitro Classic\`
    `));
}


client.giveawaysManager.start(giveawayChannel, {
    
    time: ms(giveawayDuration),
    
    prize: giveawayPrize,
    
    winnerCount: giveawayNumberWinners,
    
    hostedBy: message.author,
    
    messages: {
        giveaway: "\n\n"+"🎉🎉 **GIVEAWAY HAS STARTED** 🎉🎉", 
        giveawayEnded: "\n\n"+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Narcos Code, giveaway system..",
        noWinner: "Giveaway cancelled, no valid participations.",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false 
        }
    }
});

message.channel.send(new discord.MessageEmbed().setDescription(`
Giveaway started at: ${giveawayChannel}
`));



}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
}

exports.help = {
  name: 'çekiliş'
};