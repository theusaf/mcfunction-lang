const { NullCommand } = require("../class/builders"),
  CommandBuilder = require("../class/CommandBuilder");

const toggleDownFallCommandBuilder = new CommandBuilder("toggledownfall")
  .setDescription("Toggles the weather between clear skies and rain.");

module.exports = {
  "1.12": {
    name: "toggledownfall",
    builder: toggleDownFallCommandBuilder
  },
  "1.13": NullCommand
};