const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: { type: String, required: true },
  // Player
  player: {
    name: { type: String, default: undefined },
    class: { type: String, default: undefined },
    registro: { type: Boolean, default: false },
    conquistas: { type: [String], default: [] },
    pontos: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    status: {
      hp: { type: Number, default: 100 },
      mp: { type: Number, default: 100 },
      str: { type: Number, default: 1 },
      vit: { type: Number, default: 1 },
      agi: { type: Number, default: 1 },
      dex: { type: Number, default: 1 },
      mag: { type: Number, default: 1 },
    },
  },
  // Recursos
  recursos: {
    solarys: { type: Number, default: 0 },
  },
  // Cooldowns
  cooldowns: {
    daily: { type: Number, default: 0 },
    work: { type: Number, default: 0 },
  },
});

const User = model("User", userSchema);

module.exports = User;
