module.exports = {
  name: "ping",
  description: "Ping command",
  aliases: ["pong", "p"],
  category: "util",
  repairing: true,
  async run(client, message, args) {
    message.reply(`> **Meu ping está em:** ${client.ws.ping}ms
> **Tempo online:** <t:${Math.trunc((Date.now() - client.uptime) / 1000)}:R>`);
  },
};
