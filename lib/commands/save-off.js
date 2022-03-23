const { stripIndent } = require("common-tags"),
  CommandBuilder = require("../class/CommandBuilder");

const saveOffCommandBuilder = new CommandBuilder("save-off")
  .setDescription(stripIndent`
  Disables auto-save.
  - Multiplayer only
  - Requires 'function-permission-level=4' or higher
  `);

module.exports = {
  "1.12": {
    name: "save-off",
    builder: saveOffCommandBuilder
  }
};