const colorize = require("strcolorize");

module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(
      colorize(
        `#bold green [Client] - Online como #greenBright [${client.user.tag}!]\n#bold cyan [Guildas] - Administrando #cyanBright [${client.guilds.cache.size}] guildas!\n#bold magenta [Users] - Cuidando de #magentaBright [${client.users.cache.size}] usuários!`
      )
    );
  },
};
