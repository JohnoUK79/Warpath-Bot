const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, CLIENT_ID, GUILD_ID } = require('../config.json');
const nodeCron = require("node-cron");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()
const sql = require("../config/Database");


module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {     
        
        console.log(`${setDate} - Logged in as - ${client.user.tag}`);
        const rest = new REST({ version: '10' }).setToken(token);
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
            .then(() => {
                console.log(`Successfully registered guild application commands for Guild: ${GUILD_ID}`);
            })
            .catch(console.error);

        console.log('================ PH40 BOT Ready! ================');
        
              const guildSettingsUpdate = nodeCron.schedule("0 0 * * *", () => {
                console.log("Guild Settings Update")

                client.guilds.cache.map(r => {
                    const id = r.id
                    const name = r.name
                    const icon = r.icon
                    const owner = r.ownerId
                    const description = r.description
                    const system = r.systemChannelId
                    const rules = r.rulesChannelId
                    const updates = r.publicUpdatesChannelId
                    console.log("Guild ID - Guild Name - Guild Icon - Owner ID - Guild Description - System Channel - Rules Channel - Updates Channel")
                    console.log(id, name, icon, owner, description, system, rules, updates)
                    guildUpdate = sql.Execute(`INSERT INTO settings (guild_id, guild_name, owner_id, guild_description, updates_channel, system_channel, rules_channel) VALUES ('${id}', '${name}', '${owner}', '${description}', '${updates}', '${system}', '${rules}') ON DUPLICATE KEY UPDATE guild_name = '${name}', owner_id = '${owner}', guild_description = '${description}', updates_channel = '${updates}', system_channel = '${system}', rules_channel = '${rules}'`)
                })       
                console.log(`Guild Settings Updated`)      
            })  

            const job = nodeCron.schedule("0 0,4,8,12,16,20 * * *", () => {
                const jurisdictions = require('../data/jurisdictions');
                const jurisdictionsChannelIDs = [
                //'915034347030073404',  // OP
                //'938098999007772753',  // NVX
                //'940013410207281283',  // PH40
                //'940700957694656583',  // EFO
                //'958408697703432274',  // PHEA
                //'959761836054552636',  // New NVX
                //'964673391917400104', // CAC 
                //'995668352192229437', //?
                //'1000526899124117535', //Test Server
                '1005576978767806575', //PH Family Server
                '874703585626165288', //WARMACHINE
                '1013022541561995284', //PH40 Reborn
                '958408697703432274', //PHAK / EA / AA Server
                ];
                console.log(jurisdictionsChannelIDs)
                const hourUTC = (new Date()).getUTCHours();
                const dayOfWeeek = (new Date()).getDay();
            console.log(new Date().toLocaleString(), "Jurisdiction Event Starting");

            const { MessageEmbed, Client } = require('discord.js');
                    
                    if( (hourUTC % 4) !== 0) return console.log('Jurisdiction Already Running!');

                    const padHour = (hour) => (hour.length === 1) ? '0'+hour : hour;
                    const startHour = padHour(hourUTC+'');
                    const endHour = padHour((hourUTC === 20) ? '00' : (hourUTC+4)+'');

                    const jurisdiction = jurisdictions[dayOfWeeek+'-'+startHour];

                    if(!jurisdiction) {
                    console.log(`ERROR: ${dayOfWeeek+'-'+startHour} not found`);
                    return;
                    }

                    const jurisdictionEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(jurisdiction.title)
                        .setURL('http://www.phfamily.co.uk')
                        .setDescription(`Start: ${startHour}H00 UTC    -    End: ${endHour}H00 UTC`)
                        .addFields(
                            { name: `Missions:`, value: jurisdiction.missions.join('\n'), inline: false },
                            { name: `Rank 1`, value: `${jurisdiction.rank1} Points`, inline: true },
                            { name: `Rank 2`, value: `${jurisdiction.rank2} Points`, inline: true },
                            { name: `Rank 3`, value: `${jurisdiction.rank3} Points`, inline: true },

                        )
                        .setTimestamp()
                        .setFooter({ text: `${jurisdiction.title}.`, iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Red.jpg' });


                    for (let i = 0; i < jurisdictionsChannelIDs.length; i++) {
                    let jurisdictionsChannelID = jurisdictionsChannelIDs[i];
                    
                    try {  
                        let sendChannel = client.channels.cache.get(jurisdictionsChannelID)                
                        console.log(jurisdictionsChannelID);
                        sendChannel.send({ content: '**New Jurisdiction**', embeds: [jurisdictionEmbed] })

                    }
                    catch (e) {
                        console.log(e);
                        console.log(jurisdictionsChannelID);
                    }
}
                  });

    },
    
};
