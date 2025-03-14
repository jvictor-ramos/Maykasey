const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");
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
  name: "ascender",
  run: async (client, message, args) => {
    const user = await User.findById(message.author.id);

    if (user.player.registro) {
      return message.reply({
        content: `> ${erro} **›** Você já ascendeu no mundo de Silverfell!`,
        allowedMentions: { users: [] },
      });
    }

    const classes = new StringSelectMenuBuilder()
      .setCustomId(`class-${message.author.id}`)
      .setPlaceholder("› Clique aqui para selecionar uma categoria")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setValue("guerreiro")
          .setLabel("Guerreiro")
          .setDefault(false),
        new StringSelectMenuOptionBuilder().setValue("mago").setLabel("Mago"),
        new StringSelectMenuOptionBuilder()
          .setValue("arqueiro")
          .setLabel("Arqueiro"),
        new StringSelectMenuOptionBuilder()
          .setValue("assassino")
          .setLabel("Assassino")
      );
    const classesRow = new ActionRowBuilder().addComponents(classes);

    let msg = await message.reply({
      content: `> ${maykasey} **Maykasey:** Você sente uma presença mística ao seu redor.
Uma luz brilhante começa a envolver seu corpo e você sente o chão desaparecer sob seus pés... Você está prestes a ascender para o mundo de **Silverfell**.`,
      allowedMentions: { users: [] },
    });

    setTimeout(async () => {
      await msg.edit({
        content: `> ${system} **System:** Bem-vindo(a) à **Silverfell**!
Antes de seguir sua jornada, **escolha sua classe** entre as opções abaixo. Cada classe possui habilidades únicas que afetarão sua evolução.`,
        components: [classesRow],
        allowedMentions: { users: [] },
      });
    }, 5000);
  },
};
