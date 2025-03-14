const User = require("../../../Models/Schemas/User.js");
const {
  global: {
    utils: { erro },
  },
  global: {
    rpg: { maykasey, system },
  },
} = require("../../../Constants/emojis.json");

module.exports = {
  name: "cancelName",
  authorOnly: true,
  run: async (client, interaction) => {
    const user = await User.findById(interaction.user.id);

    if (!user) {
      return interaction.update({
        content: `${erro} **›** Você não tem um registro para cancelar.`,
        components: [],
      });
    }

    await user.deleteOne();

    await interaction.update({
      content: `${erro} **›** Seu registro foi cancelado.`,
      components: [],
    });
  },
};
