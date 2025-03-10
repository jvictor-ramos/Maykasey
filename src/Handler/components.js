const { Collection } = require("discord.js");

const fs = require("fs");
const path = require("path");
const colors = require("colors");

module.exports = (client) => {
  client.components = new Collection();

  const loadedComponentsData = [];

  const loadComponents = (dir) => {
    const componentFiles = fs.readdirSync(dir);

    componentFiles.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        loadComponents(filePath);
      } else if (file.endsWith(".js")) {
        try {
          const component = require(path.resolve(filePath));
          if (!component) return;
          client.components.set(component.name, component);
          loadedComponentsData.push(
            `${"✔ Loaded".green} "${file.replace(".js", "")}" ${
              "(component)".gray
            }`
          );
        } catch (error) {
          const errorType = error.name || "Error";
          loadedComponentsData.push(
            `${"× Failed".red} "${file.replace(".js", "")}" ${
              `(${errorType})`.gray
            }`
          );
          console.error(
            `Erro ao carregar o componente em: ${filePath}\n`,
            error
          );
        }
      }
    });
  };

  loadComponents(path.resolve("./src/Discord/Components"));

  const title = "Components Loader";

  const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, "");

  const maxElementLength = Math.min(
    Math.max(
      ...loadedComponentsData.map((e) => stripAnsi(e).length),
      title.length
    ),
    (process.stdout?.columns || 80) - 4
  );

  const horizontalBorder = "─".repeat(maxElementLength + 2);
  const paddedTitle = title
    .padStart((maxElementLength - title.length) / 2 + title.length)
    .padEnd(maxElementLength);

  console.log(`╭${horizontalBorder}╮`);
  console.log(`│ ${paddedTitle.cyan} │`);

  loadedComponentsData.forEach((element) => {
    const strippedElement = stripAnsi(element);
    const paddedElement = strippedElement.padEnd(maxElementLength);
    const coloredElement =
      element + " ".repeat(maxElementLength - strippedElement.length);
    console.log(`│ ${coloredElement} │`);
  });

  console.log(`╰${horizontalBorder}╯`);
};
