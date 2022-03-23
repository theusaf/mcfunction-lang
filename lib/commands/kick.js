const { CommandBuilder } = require("../class/builders"),
  { stripIndent } = require("common-tags");

const kickCommandBuilder = new CommandBuilder("kick")
  .setDescription(stripIndent`
  Kicks a player off of the server.
  - Multiplayer only.
  - Requires 'function-permission-level=3' or higher.
  `)
  .createNamedSection("GREEDY_MESSAGE", (section) => {
    section.addStringOption("reason", (opt) => {
      opt.setOptional()
        .setDisplayText("reason")
        .setSnippet("${1:message}");
    })
      .addSectionOption((section) => {
        section.addSectionOption("GREEDY_MESSAGE");
      });
  })
  .addSelectorOption("target", (opt) => {
    opt.setDescription("The player or players to kick");
  })
  .addSectionOption("GREEDY_MESSAGE");

module.exports = {
  "1.12": {
    name: "kick",
    builder: kickCommandBuilder
  }
};
