const sql = require(`../config/Database`)

module.exports = {
    name: 'guildBanDelete',
    async execute(guild) {
        console.log(`Guild Ban Add:\n${guild}`)
    }
};
