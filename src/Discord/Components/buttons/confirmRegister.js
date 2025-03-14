const User = require("../../../Models/Schemas/User.js");

module.exports = {
  name: "confirmName",
  authorOnly: true,
  run: async (client, interaction) => {
    const user = await User.findById(interaction.user.id);

    interaction.update({
      content: `Oi ${user.player.name}, essa é a historia foda. você está registrado`,
      components: [],
    });

    user.player.registro = true;
    await user.save();
  },
};
