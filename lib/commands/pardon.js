const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const pardonCommandBuilder = new CommandBuilder("pardon")
  .setDescription(stripIndent`
  Removes banned players from the ban list.
  - Multiplayer only
  - Requries 'function-permission-level=3' or higher.
  `)
  .addSelectorOption("players");

module.exports = {
  "1.12": {
    name: "op",
    builder: pardonCommandBuilder
  }
};