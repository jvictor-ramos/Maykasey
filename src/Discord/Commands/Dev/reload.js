const fs = require("fs");
const path = require("path");
const loadCommands = require("../../../Utils/loadCommands.js");

module.exports = {
  name: "reload",
  description: "Recarrega os comandos",
  aliases: ["r", "update"],
  devOnly: true,
  run: async (client, message) => {
    const reloadCommands = (dir) => {
      fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        if (fs.lstatSync(filePath).isDirectory()) {
          reloadCommands(filePath);
        } else if (file.endsWith(".js")) {
          delete require.cache[require.resolve(filePath)];
          const command = require(filePath);
          client.commands.set(command.name, command);
        }
      });
    };

    const reloadComponents = (dir) => {
      fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        if (fs.lstatSync(filePath).isDirectory()) {
          reloadComponents(filePath);
        } else if (file.endsWith(".js")) {
          delete require.cache[require.resolve(filePath)];
          const component = require(filePath);
          client.components.set(component.name, component);
        }
      });
    };
    reloadComponents(path.join(__dirname, "../../Components"));

    loadCommands(client, path.join(__dirname, "../../Commands"));
    reloadCommands(path.join(__dirname, "../../Commands"));

    message.reply(
      `> **( :arrows_counterclockwise: ) -** Todos os comandos foram recarregados com sucesso!`
    );
  },
};
