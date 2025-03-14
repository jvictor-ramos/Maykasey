const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const User = require("../../../Models/Schemas/User.js");
const {
  global: {
    utils: { erro },
  },
  global: {
    rpg: { maykasey, system },
  },
  global: {
    utils: { info },
  },
} = require("../../../Constants/emojis.json");

module.exports = {
  name: "class",
  authorOnly: true,
  run: async (client, interaction) => {
    const user = await User.findById(interaction.user.id);
    const selection = interaction.values?.[0];

    const messages = {
      guerreiro: `Você é um guerreiro foda que é lento, mas é potente.`,
      mago: `Você é um mago que lança magia.`,
      arqueiro: `Você é um cara que atira flecha de longe.`,
      assassino: `Você mata o povo.`,
    };
    const regras = `> ${info} **› Digite seu nome abaixo. **
- Deve ter entre **4 e 12 caracteres**.  
- **Permitido:** Letras, números e **"_"** (underline).  
- **Proibido:** Caracteres especiais (\`$#@!%&*+\`) e espaços.  
`;

    if (!messages[selection]) {
      return interaction.reply(`${erro} **›** Opção inválida!`);
    }

    interaction.update({
      content: `${messages[selection]}\n${regras}`,
      components: [],
    });

    const filtro = (m) => m.author.id === interaction.user.id;
    const coletor = interaction.channel.createMessageCollector({
      filter: filtro,
      time: 10000,
      max: 1,
    });

    coletor.on("collect", async (msg) => {
      const args = msg.content.split(" ");
      const regex = /^[a-zA-Z0-9_]{4,11}$/;
      const nome = args[0];

      if (!regex.test(nome)) {
        return msg.reply(
          `${erro} **›** O nome não pode conter espaços ou caracteres especiais.`
        );
      }

      const nomeExistente = await User.findOne({ "player.name": nome });
      if (nomeExistente) {
        return msg.reply(
          `${erro} **›** Esse nome já está em uso. Escolha outro!`
        );
      }

      const confirmButton = new ButtonBuilder()
        .setCustomId(`confirmName-${interaction.user.id}-${nome}`)
        .setLabel("Confirmar")
        .setStyle(ButtonStyle.Success);

      const cancelButton = new ButtonBuilder()
        .setCustomId(`cancelName-${interaction.user.id}`)
        .setLabel("Cancelar")
        .setStyle(ButtonStyle.Danger);

      const buttonsRow = new ActionRowBuilder().addComponents(
        cancelButton,
        confirmButton
      );

      msg.channel.send({
        content: `${system} Você deseja ser chamado de **${nome}**?\n> Clique nos botões abaixo para confirmar ou cancelar.`,
        components: [buttonsRow],
      });

      user.player.class = selection;
      user.player.name = nome;
      await user.save();
    });

    coletor.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.channel.send(
          `> ${erro} **›** Tempo esgotado! Você não enviou as informações a tempo.`
        );
      }
    });
  },
};
