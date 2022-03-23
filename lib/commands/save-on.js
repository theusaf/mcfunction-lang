const { stripIndent } = require("common-tags"),
  CommandBuilder = require("../class/CommandBuilder");

const saveOnCommandBuilder = new CommandBuilder("save-on")
  .setDescription(stripIndent`
  Enables auto-save.
  - Multiplayer only
  - Requires 'function-permission-level=4' or higher
  `);

module.exports = {
  "1.12": {
    name: "save-on",
    builder: saveOnCommandBuilder
  }
};