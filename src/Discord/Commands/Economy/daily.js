const User = require("../../../Models/Schemas/User.js");
const { random } = require("../../../Modules/Utils/random.js");

module.exports = {
  name: "daily",
  aliases: ["diária", "recompensa"],
  async run(client, message, args) {
    const user = await User.findById(message.author.id);
    const now = Date.now();
    const lastDaily = user.cooldowns.daily;
    const amount = random(250, 1750);
    const cooldown = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    const nextDaily = now + cooldown;

    if (lastDaily > now) {
      return message.reply(
        `> **( ⏰ ) ›** Você coletou sua recompensa diária recentemente! Volte ( <t:${Math.floor(
          nextDaily / 1000
        )}:R> )`
      );
    }

    message.reply(
      `> **( <:saco:1299121235552374857> ) ›** Recompensa coletada! Você coletou **${amount} Solarys** em sua recompensa diária.`
    );

    user.cooldowns.daily = nextDaily;
    user.solarys += amount;

    await user.save();
  },
};
