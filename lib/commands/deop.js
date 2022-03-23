const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const deopCommandBuilder = new CommandBuilder("deop")
  .setDescription(stripIndent`
  Removes operator permissions from players.
  - Multiplayer only
  - Requires 'function-permission-level=3' or higher
  `)
  .addSelectorOption("targets");

module.exports = {
  "1.12": {
    name: "deop",
    builder: deopCommandBuilder
  }
};