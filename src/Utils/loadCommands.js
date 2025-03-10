const fs = require("fs");
const path = require("path");
const colors = require("colors");

module.exports = (client, dir) => {
  const loadedFilesData = [];

  const loadCommands = (dir) => {
    const commandFiles = fs.readdirSync(dir);

    commandFiles.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        loadCommands(filePath);
      } else if (file.endsWith(".js")) {
        try {
          const command = require(path.resolve(filePath));
          client.commands.set(command.name, command);
          loadedFilesData.push(`${"✔ Loaded".green} "${file.replace(".js", "")}" ${"(prefix)".gray}`);
        } catch (error) {
          const errorType = error.name || "Error";
          loadedFilesData.push(`${"× Failed".red} "${file.replace(".js", "")}" ${`(${errorType})`.gray}`);
          console.error(`Erro ao carregar o comando em: ${filePath}\n`, error);
        }
      }
    });
  };

  loadCommands(dir);

  const title = "Commands Loader";
  const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, "");

  const maxElementLength = Math.min(
    Math.max(...loadedFilesData.map((e) => stripAnsi(e).length), title.length),
    (process.stdout?.columns || 80) - 4,
  );

  const horizontalBorder = "─".repeat(maxElementLength + 2);
  const paddedTitle = title
    .padStart((maxElementLength - title.length) / 2 + title.length)
    .padEnd(maxElementLength);

  console.log(`╭${horizontalBorder}╮`);
  console.log(`│ ${paddedTitle.cyan} │`);

  loadedFilesData.forEach((element) => {
    const strippedElement = stripAnsi(element);
    const paddedElement = strippedElement.padEnd(maxElementLength);
    const coloredElement = element + " ".repeat(maxElementLength - strippedElement.length);
    console.log(`│ ${coloredElement} │`);
  });

  console.log(`╰${horizontalBorder}╯`);
};