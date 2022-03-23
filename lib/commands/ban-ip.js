const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const banIPCommandBuilder = new CommandBuilder("ban-ip")
  .setDescription(stripIndent`
  Bans players from a server by IP address.
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
    name: "ban-ip",
    builder: banIPCommandBuilder
  }
};