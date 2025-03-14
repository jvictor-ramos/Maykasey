const db = require("../../Models/Schemas/Guilds.js");
const { MessageFlags } = require("discord.js");

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

    const checkAuthor = (customId, userId) => {
      const args = customId.split("-");
      const interactionId = args.shift();
      const data = client.components.get(interactionId);
      if (data?.authorOnly && userId !== args[0]) {
        return `${userId}, somente o autor da mensagem pode interagir com isso!`;
      }
      return data;
    };

    const processInteraction = async (customId, type) => {
      const data = checkAuthor(customId, interaction.user.id);
      if (typeof data === "string") {
        return interaction.reply({
          content: data,
          flags: MessageFlags.Ephemeral,
        });
      }

      if (data) {
        data.run(client, interaction, customId.split("-").slice(1), db);
      }
    };

    if (interaction.isButton()) {
      return processInteraction(interaction.customId, "button");
    }

    if (interaction.isAnySelectMenu()) {
      return processInteraction(interaction.customId, "selectMenu");
    }

    if (interaction.isModalSubmit()) {
      return processInteraction(interaction.customId, "modalSubmit");
    }
  },
};
