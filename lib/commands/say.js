const { CommandBuilder } = require("../class/builders");

const meCommandBuilder = new CommandBuilder("me")
  .setDescription("Sends a chat message about yourself.")
  .createNamedSection("GREEDY_MESSAGE", (section) => {
    section.addStringOption("message", (opt) => {
      opt.setOptional()
        .setDisplayText("message")
        .setSnippet("${1:message}")
        .setParallel();
    })
      .addSelectorOption()
      .addSectionOption((section) => {
        section.addSectionOption("GREEDY_MESSAGE");
      });
  })
  .addSectionOption("GREEDY_MESSAGE");

module.exports = {
  "1.12": {
    name: "me",
    builder: meCommandBuilder
  }
};