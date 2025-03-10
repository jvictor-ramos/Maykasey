const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "jobs",
  run: async (client, message, args) => {
    const jobs = new StringSelectMenuBuilder()
      .setCustomId(`jobs-${message.author.id}`)
      .setPlaceholder("› Clique aqui para selecionar uma categoria")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setValue("fazendeiro")
          .setLabel("Fazendeiro")
          .setDefault(false),
        new StringSelectMenuOptionBuilder()
          .setValue("programador")
          .setLabel("Programador"),
        new StringSelectMenuOptionBuilder()
          .setValue("médico")
          .setLabel("Médico")
          .setDefault(false),
        new StringSelectMenuOptionBuilder()
          .setValue("policial")
          .setLabel("Policial")
      );
    const row = new ActionRowBuilder().addComponents(jobs);

    message.reply({ content: "selecione uma profissão", components: [row] });
  },
};
