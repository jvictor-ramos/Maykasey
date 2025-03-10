const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

function createSelectMenu(
  customId,
  placeholder = "› Clique aqui para selecionar uma categoria",
  options = []
) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(customId)
    .setPlaceholder(placeholder);

  if (options.length > 0) {
    options.forEach((option) => {
      const optionBuilder = new StringSelectMenuOptionBuilder()
        .setValue(option.value)
        .setLabel(option.label);

      if (option.description) optionBuilder.setDescription(option.description);
      if (option.emoji) optionBuilder.setEmoji(option.emoji);
    });
  }
  return new ActionRowBuilder().addComponents(menu);
}

module.exports = { createSelectMenu };
