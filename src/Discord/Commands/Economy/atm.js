const User = require("../../../Models/Schemas/User.js");

module.exports = {
  name: "atm",
  aliases: ["saldo", "bal", "balance", "carteira"],
  async run(client, message, args) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const userdb = await User.findById(user.id);
    const allUsers = await User.find({}).sort({ "recursos.solarys": -1 });
    let indexOfUser = allUsers.findIndex(
      (userposi) => userposi._id === user.user.id
    );
    message.reply(
      `> **( 💰 ) ›** ${message.author}, ${
        user.user.id === message.author.id ? "Você" : user.user.username
      } possui **${userdb.recursos.solarys.toLocaleString()} Solarys**, e está na posição **#${++indexOfUser}** do rank!`
    );
  },
};
