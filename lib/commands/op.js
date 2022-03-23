const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const opCommandBuilder = new CommandBuilder("op")
  .setDescription(stripIndent`
  Grants operator permissions to players
  - Multiplayer only
  - Requries 'function-permission-level=3' or higher.
  `)
  .addSelectorOption("players");

module.exports = {
  "1.12": {
    name: "op",
    builder: opCommandBuilder
  }
};