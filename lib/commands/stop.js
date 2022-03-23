const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const stopCommandBuilder = new CommandBuilder("stop")
  .setDescription(stripIndent`
  Saves changes and shuts down the server.
  - Multiplayer only
  - Requires 'function-permission-level=4' or higher
  `);

module.exports = {
  "1.12": {
    name: "stop",
    builder: stopCommandBuilder
  }
};