const { CommandBuilder } = require("../class/builders");

const teamMsgCommandBuilder = new CommandBuilder("teammsg")
  .addAlias("tm")
  .setDescription("Sends a chat message to the executor's team.")
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
  "1.14": {
    name: [ "teammsg", "tm" ],
    builder: teamMsgCommandBuilder
  }
};