const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const banCommandBuilder = new CommandBuilder("ban")
  .setDescription(stripIndent`
  Bans players from a server.
  - Multiplayer only
  - Requires 'function-permission-level=3' or higher
  `)
  .addSelectorOption("targets")
  .addStringOption("reason", (opt) => {
    opt.setDisplayText("reason")
      .setSnippet("${1:message}")
      .setOptional();
  });

module.exports = {
  "1.12": {
    name: "ban",
    builder: banCommandBuilder
  }
};