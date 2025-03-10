const config = require("../../Utils/config.json");
const configs = require("../../Utils/config.js");
const User = require("../../Models/Schemas/User.js");
const Guild = require("../../Models/Schemas/Guilds.js");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return;

    const userdb = await User.findById(message.author.id);

    // Verificar e criar o usuário, se não existir
    let user = await User.findById(message.author.id);
    if (!user) {
      user = await User.create({ _id: message.author.id });
    }

    const guildId = message.guild.id;
    let prefix;

    try {
      const guild =
        Guild.findById(message.guild.id) ||
        (await Guild.create({ _guildId: message.guild.id }));

      prefix = guild.prefix || config.prefix;
      if (!prefix) throw new Error("Prefixo não encontrado no banco de dados");
    } catch (error) {
      console.error(`Erro ao buscar prefixo para o guild ${guildId}:`, error);
      return;
    }

    if (message.content.replace(`${prefix}`, "") === `<@${client.user.id}>`) {
      return message.reply(`Oi, meu prefixo é **${prefix}**`);
    }

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift()?.toLowerCase();
    const cmd = client.commands.find(
      (c) => c.name === command || (c.aliases && c.aliases.includes(command))
    );

    if (cmd) {
      // Verificar se o comando é apenas para devs
      if (cmd.devOnly && !client.developers.includes(message.author.id)) {
        return message.reply(
          `**( <:x_:1296573341255209042> ) -** Este comando é restrito aos desenvolvedores!`
        );
      }

      if (cmd.repairing && !client.developers.includes(message.author.id)) {
        return message.reply(
          `**( <:x_:1296573341255209042> ) -** Este comando esta em manutenção!`
        );
      }
    }

    if (!cmd) return;

    try {
      if (cmd) {
        cmd.run(client, message, args, userdb);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
