const CommandBuilder = require("../class/CommandBuilder");

const seedCommandBuilder = new CommandBuilder("seed")
  .setDescription("Gets the world seed.");

module.exports = {
  "1.12": {
    name: "seed",
    builder: seedCommandBuilder
  }
};