const db = require("../../Models/Schemas/Guilds.js");
const { MessageFlags } = require("../../Models/Schemas/User.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isCommand()) return;
    if (interaction.message.createdTimestamp < (client.readyTimestamp || 0)) {
      return interaction.reply({
        content: "Os dados dessa interação foram perdidos...",
        flags: MessageFlags.Ephemeral,
      });
    }
    if (interaction.isButton()) {
      const args = interaction.customId.split("-");
      const interactionId = args.shift();
      const buttonData = client.components.get(interactionId);

      if (buttonData?.authorOnly && interaction.user.id !== args[0])
        return interaction.reply({
          content: `${interaction.user}, somente o autor da mensagem pode clicar nesse botão!`,
          flags: MessageFlags.Ephemeral,
        });

      if (buttonData) buttonData.run(client, interaction, args, db);
    }

    if (interaction.isAnySelectMenu()) {
      const args = interaction.customId.split("-");
      const interactionId = args.shift();
      const stringMenuData = client.components.get(interactionId);

      if (stringMenuData?.authorOnly && interaction.user.id !== args[0])
        return interaction.reply({
          content: `${interaction.user}, somente o autor da mensagem pode usar esse menu!`,
          flags: MessageFlags.Ephemeral,
        });

      if (stringMenuData) stringMenuData.run(client, interaction, args, db);
    }

    if (interaction.isModalSubmit()) {
      const args = interaction.customId.split("-");
      const interactionId = args.shift();
      const modalSubmitData = client.components.get(interactionId);

      if (modalSubmitData?.authorOnly && interaction.user.id !== args[0])
        return interaction.reply({
          content: `${interaction.user}, somente o autor da mensagem pode usar esse modal!`,
          flags: MessageFlags.Ephemeral,
        });

      if (modalSubmitData) modalSubmitData.run(client, interaction, args, db);
    }
  },
};
