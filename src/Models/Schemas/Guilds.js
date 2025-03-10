const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  _guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: "s," },
});

module.exports = mongoose.model("Server", serverSchema);
