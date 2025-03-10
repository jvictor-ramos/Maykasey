const { Client, Collection } = require("discord.js");
const colorize = require("strcolorize");
const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGOURL;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(
      colorize(
        `#bold yellow [Database] - Conectado ao #yellowBright [MongoDB!]`
      )
    );
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

const client = new Client({ intents: 3276799 });

client.commands = new Collection();
client.components = new Collection();
client.slashCommands = new Collection();
client.developers = ["1208958778243031060"];

client.login(process.env.TOKEN);

fs.readdir("./src/Handler", (err, files) => {
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => require(`./src/Handler/${file}`)(client));
});

module.exports = client;
