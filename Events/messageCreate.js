const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Guild } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require('./interactionCreate');
time = require('../config/timestamp')
setDate = time.UTCdefault()

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot === true) {
			return;
		}
		Settings = await sql.Execute(`select * from settings where guild_id = '${message.guild.id}';`); 
		Levels = await sql.Execute(`select * from levels where discord_id = '${message.author.id}';`); 
		var score = Math.floor(Math.random() * 150) * 3;
		GuildName = message.guild.name

		const updatePlayer =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('UID')
				.setLabel('Add / Update your Search Profile!')
				.setStyle('PRIMARY'),
		)

		const devSupport = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Buy the Dev A Beer!')
		.setURL('https://www.buymeacoffee.com/johnouk79')
		.setThumbnail(message.member.displayAvatarURL())
		.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`**Enjoying the Bot? Buy the Dev a Beer**!`)
		.addFields(
			{ name: `Buy Now!:`, value: `https://www.buymeacoffee.com/johnouk79` },
			)
		.setFooter({ text: 'Buy Dekes A Beer!.', iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg' });


		const newPlayer = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Welcome to the PH Family')
		.setURL('http://www.phfamily.co.uk')
		.setThumbnail(message.member.displayAvatarURL())
		.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Welcome **<@${message.member.id}>**!`)
		.addFields(
			{ name: `Name:`, value: `${message.member.displayName}` },
			{ name: `Points:`, value: `${score}` },
			{ name: 'Welcome to the PH Family.', value: `Stay active in our servers for regular rewards!`, inline: true },
			)
		.setImage(`http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg`)
		.setTimestamp()
		.setFooter({ text: 'Welcome to the PH Family.', iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg' });

		if (Levels.length === 0) {
			console.log("New Member")
			playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
			level = 0
			var score = Math.floor(Math.random() * 150) * 3;
			let result = await sql.Execute(`INSERT INTO levels (discord_id, points, level, discord_username, last_seen_server) VALUES ('${message.author.id}', '${score}', '${level}', '${message.member.displayName}', '${GuildName}');`)
			await message.reply({
				content: `Welcome to the PH Family **${message.member.displayName}**.\nWe look forward to you becoming a valued member of our community!`,
				components: [updatePlayer],
				embeds: [newPlayer]
			});
			return;			
		}

		Lookup = Levels[0].player_id
		if (Lookup.length === 0) {Players = null} else {
		Players = await sql.Execute(`select * from players where player_id = ${Levels[0].player_id}`);}
				
		if (!Players) {
			var score = Math.floor(Math.random() * 150) * 3;
			let playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
		} else {var playerImage = Players[0].player_image
			playerId = Levels[0].player_id
			updatePlayers = await sql.Execute(`UPDATE players SET date_last_known = '${setDate}', discord ='${message.author.id}', discord_server = '${GuildName}' WHERE player_id = ${playerId}`)}

		let roleRank10 = Settings[0].Rank_10
		let roleRank20 = Settings[0].Rank_20
		let roleRank30 = Settings[0].Rank_30
		let roleRank40 = Settings[0].Rank_40
		let roleRank50 = Settings[0].Rank_50
		let roleRank60 = Settings[0].Rank_60
		let roleRank70 = Settings[0].Rank_70
		let roleRank80 = Settings[0].Rank_80
		let roleRank90 = Settings[0].Rank_90
		let roleRank100 = Settings[0].Rank_100
		
		let scoreLevel = Levels[0].level
		let r10name = message.guild.roles.cache.find( r => r.id === roleRank10 )
		let r20name = message.guild.roles.cache.find( r => r.id === roleRank20 )
		let r30name = message.guild.roles.cache.find( r => r.id === roleRank30 )
		let r40name = message.guild.roles.cache.find( r => r.id === roleRank40 )
		let r50name = message.guild.roles.cache.find( r => r.id === roleRank50 )
		let r60name = message.guild.roles.cache.find( r => r.id === roleRank60 )
		let r70name = message.guild.roles.cache.find( r => r.id === roleRank70 )
		let r80name = message.guild.roles.cache.find( r => r.id === roleRank80 )
		let r90name = message.guild.roles.cache.find( r => r.id === roleRank90 )
		let r100name = message.guild.roles.cache.find( r => r.id === roleRank100 )

		if (scoreLevel > 20) {
			var score = Math.floor(Math.random() * 150) * 2;
		}
		if (scoreLevel > 30) {
			var score = Math.floor(Math.random() * 125) * 2;
		}
		if (scoreLevel > 40) {
			var score = Math.floor(Math.random() * 100) * 2;
		}	
		if (scoreLevel > 50) {
			var score = Math.floor(Math.random() * 75) * 2;
		}	
		if (scoreLevel > 60) {
			var score = Math.floor(Math.random() * 50) * 2;
		}	
		if (scoreLevel > 70) {
			var score = Math.floor(Math.random() * 25) + 1;
		} 
		if (scoreLevel > 80) {
			var score = Math.floor(Math.random() * 15) +1;
		} 
		if (scoreLevel > 90) {
			var score = Math.floor(Math.random() * 10) +1;
		} 
		if (scoreLevel > 100) {
			var score = Math.floor(Math.random() * 5) +1;
		} 
			
		points = Levels[0].points
		newPoints = (points + score)
		newLevel = (Levels[0].level + 1)
		let LevelUpChannel = Settings[0].level_up_channel_id
		console.log(LevelUpChannel)

		const levelup = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Level Up')
            .setURL('http://www.phfamily.co.uk')
            .setThumbnail(message.member.displayAvatarURL())
            .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`Congratulations **<@${message.member.id}>** you have levelled up!`)
            .addFields(
                { name: `Name:`, value: `<@${message.member.id}>` },
                { name: `Points:`, value: `${newPoints}` },
                { name: 'Level', value: `${newLevel}`, inline: true },
                )
            .setImage(playerImage)
            .setTimestamp()
            .setFooter({ text: 'Level Up - PH Family.', iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg' });


		let initiallevel = Levels[0].level
		level = Math.floor((score + points) / 3666 )

		if (level > initiallevel) {
			console.log("Level Up")
 			await message.guild.channels.cache.get(LevelUpChannel).send({
				embeds: [levelup],
				components: [updatePlayer],
			}) 

			if (level === 10) {
				console.log("Rank Up")
				if (!roleRank10) {
					console.log("No Role Set")
					await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Private**`})
					await message.guild.channels.cache.get(LevelUpChannel).send({
						embeds: [devSupport],
					}) 					
				} else {
				await message.member.roles.add(roleRank10).catch((e) => console.log(e))
				await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r10name.name}**` })
				await message.guild.channels.cache.get(LevelUpChannel).send({
					embeds: [devSupport],
				})}
				} 

				if (level === 20) {
					console.log("Rank Up")
					if (!roleRank20) {
						console.log("No Role Set")
						await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Corporal**`})
						await message.guild.channels.cache.get(LevelUpChannel).send({
							embeds: [devSupport],
						}) 						
					} else {
					await message.member.roles.add(roleRank20).catch((e) => console.log(e))
					await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r20name.name}**` })
					await message.guild.channels.cache.get(LevelUpChannel).send({
						embeds: [devSupport],
					})} 
					} 

					if (level === 30) {
						console.log("Rank Up")
						if (!roleRank30) {
							console.log("No Role Set")
							await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Sergeant**`})
							await message.guild.channels.cache.get(LevelUpChannel).send({
								embeds: [devSupport],
							}) 
						} else {
						await message.member.roles.add(roleRank30).catch((e) => console.log(e))
						await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r30name.name}**` })
						await message.guild.channels.cache.get(LevelUpChannel).send({
							embeds: [devSupport],
						})} 
						} 

						if (level === 40) {
							console.log("Rank Up")
							if (!roleRank40) {
								console.log("No Role Set")
								await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Lieutenant**`})
								await message.guild.channels.cache.get(LevelUpChannel).send({
									embeds: [devSupport],
								}) 
							} else {
							await message.member.roles.add(roleRank40).catch((e) => console.log(e))
							await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r40name.name}**` })
							await message.guild.channels.cache.get(LevelUpChannel).send({
								embeds: [devSupport],
							})} 
							} 

							if (level === 50) {
								console.log("Rank Up")
								if (!roleRank50) {
									console.log("No Role Set")
									await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Captain**`})
									await message.guild.channels.cache.get(LevelUpChannel).send({
										embeds: [devSupport],
									}) 
								} else {
								await message.member.roles.add(roleRank50).catch((e) => console.log(e))
								await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r50name.name}**` })
								await message.guild.channels.cache.get(LevelUpChannel).send({
									embeds: [devSupport],
								})} 
								} 

								if (level === 60) {
									console.log("Rank Up")
									if (!roleRank60) {
										console.log("No Role Set")
										await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Major**`})
										await message.guild.channels.cache.get(LevelUpChannel).send({
											embeds: [devSupport],
										}) 
									} else {
									await message.member.roles.add(roleRank60).catch((e) => console.log(e))
									await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r60name.name}**` })
									await message.guild.channels.cache.get(LevelUpChannel).send({
										embeds: [devSupport],
									})} 
									} 

									if (level === 70) {
										console.log("Rank Up")
										if (!roleRank70) {
											console.log("No Role Set")
											await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Colonel**`})
											await message.guild.channels.cache.get(LevelUpChannel).send({
												embeds: [devSupport],
											}) 
										} else {
										await message.member.roles.add(roleRank70).catch((e) => console.log(e))
										await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r70name.name}**` })
										await message.guild.channels.cache.get(LevelUpChannel).send({
											embeds: [devSupport],
										})} 
										} 

										if (level === 80) {
											console.log("Rank Up")
											if (!roleRank80) {
												console.log("No Role Set")
												await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Major General**`})
												await message.guild.channels.cache.get(LevelUpChannel).send({
													embeds: [devSupport],
												}) 
											} else {
											await message.member.roles.add(roleRank80).catch((e) => console.log(e))
											await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r80name.name}**` })
											await message.guild.channels.cache.get(LevelUpChannel).send({
												embeds: [devSupport],
											})} 
											} 

											if (level === 90) {
												console.log("Rank Up")
												if (!roleRank90) {
													console.log("No Role Set")
													await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **General**`})
													await message.guild.channels.cache.get(LevelUpChannel).send({
														embeds: [devSupport],
													}) 
												} else {
												await message.member.roles.add(roleRank90).catch((e) => console.log(e))
												await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r90name.name}**` })
												await message.guild.channels.cache.get(LevelUpChannel).send({
													embeds: [devSupport],
												})} 
												} 

												if (level === 100) {
													console.log("Rank Up")
													if (!roleRank100) {
														console.log("No Role Set")
														await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **General of The Army**`})
														await message.guild.channels.cache.get(LevelUpChannel).send({
															embeds: [devSupport],
														}) 
													} else {
													await message.member.roles.add(roleRank100).catch((e) => console.log(e))
													await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r100name.name}**` })
													await message.guild.channels.cache.get(LevelUpChannel).send({
														embeds: [devSupport],
													})} 
													} 
		}
		let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${message.member.displayName}', last_seen_server = '${GuildName}' WHERE discord_id = '${message.author.id}'`)}
	}; 
