const { NullCommand } = require("../class/builders"),
  CommandBuilder = require("../class/CommandBuilder");

const testForCommandBuilder = new CommandBuilder("testfor")
  .setDescription("Tests for the existence of entities.")
  .addSelectorOption("targets");

module.exports = {
  "1.12": {
    name: "testfor",
    builder: testForCommandBuilder
  },
  "1.13": NullCommand
};