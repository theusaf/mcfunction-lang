const CommandBuilder = require("../class/CommandBuilder");

const tellCommandBuilder = new CommandBuilder("tell")
  .setDescription("Sends a message to one or more players.")
  .addAlias("msg")
  .addAlias("w")
  .createNamedSection("MESSAGE", (section) => {
    section.addStringOption("message", (opt) => {
      opt.setDescription("The message to send.")
        .setDisplayText("message")
        .setSnippet("${1:message}");
    })
      .addSectionOption((section) => {
        section.addSectionOption("MESSAGE");
      });
  })
  .addSelectorOption("targets", (opt) => {
    opt.setDescription("The player(s) to send the message to.");
  })
  .addSectionOption("MESSAGE");

module.exports = {
  "1.12": {
    name: "tell",
    builder: tellCommandBuilder
  }
};