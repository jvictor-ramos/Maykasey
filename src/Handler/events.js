const fs = require("fs");
const path = require("path");
const colors = require("colors");

module.exports = (client) => {
  const loadedEventsData = [];

  const loadEvents = (dir) => {
    const eventFiles = fs.readdirSync(dir);

    eventFiles.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        loadEvents(filePath);
      } else if (file.endsWith(".js")) {
        try {
          const eventData = require(path.resolve(filePath));
          client.on(eventData.name, (...args) =>
            eventData.run(client, ...args)
          );
          loadedEventsData.push(
            `${"✔ Loaded".green} "${file.replace(".js", "")}" ${"(event)".gray}`
          );
        } catch (error) {
          const errorType = error.name || "Error";
          loadedEventsData.push(
            `${"× Failed".red} "${file.replace(".js", "")}" ${
              `(${errorType})`.gray
            }`
          );
          console.error(`Erro ao carregar o evento em: ${filePath}\n`, error);
        }
      }
    });
  };

  loadEvents(path.resolve("./src/Discord/Events"));

  const title = "Events Loader";

  const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, "");

  const maxElementLength = Math.min(
    Math.max(...loadedEventsData.map((e) => stripAnsi(e).length), title.length),
    (process.stdout?.columns || 80) - 4
  );

  const horizontalBorder = "─".repeat(maxElementLength + 2);
  const paddedTitle = title
    .padStart((maxElementLength - title.length) / 2 + title.length)
    .padEnd(maxElementLength);

  console.log(`╭${horizontalBorder}╮`);
  console.log(`│ ${paddedTitle.cyan} │`);

  loadedEventsData.forEach((element) => {
    const strippedElement = stripAnsi(element);
    const paddedElement = strippedElement.padEnd(maxElementLength);
    const coloredElement =
      element + " ".repeat(maxElementLength - strippedElement.length);
    console.log(`│ ${coloredElement} │`);
  });

  console.log(`╰${horizontalBorder}╯`);
};
