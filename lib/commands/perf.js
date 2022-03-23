const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const perfCommandBuilder = new CommandBuilder("perf")
  .setDescription(stripIndent`
  Captures information about the game.
  - Multiplayer only
  - Requires 'function-permission-level=4' or higher
  `)
  .addEnumOption("action", (opt) => {
    opt.addChoice("start", "Records metrics for 10 seconds.")
      .addChoice("stop", "Stops the performance recording.");
  });

module.exports = {
  "1.17": {
    name: "perf",
    builder: perfCommandBuilder
  }
};