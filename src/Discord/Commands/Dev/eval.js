const { inspect } = require("util");

module.exports = {
  name: "eval",
  aliases: ["e"],
  devOnly: true,
  category: "dev",
  run: async (client, message, args, userdb) => {
    const blockWords = [
      "client.token",
      "process.exit(1)",
      "client.destroy()",
      `process["exit"](1)`,
    ];
    if (blockWords.includes(args.join(" "))) return;

    try {
      const code = args.join(" ");

      const evaled = await (async () => {
        return await eval(code);
      })();

      const formattedResult = inspect(evaled, { depth: 1 }).substring(0, 1990);

      message.channel.send(`\`\`\`js\n${formattedResult}\`\`\``);
    } catch (error) {
      message.channel.send(`\`\`\`js\n${error}\`\`\``);
    }
  },
};
