const CommandBuilder = require("../class/CommandBuilder");

const tellRawCommandBuilder = new CommandBuilder("tellraw")
  .setDescription("Sends JSON messages to players.")
  .addSelectorOption("targets")
  .addNBTOption("message", (opt) => {
    opt.setDescription("The raw JSON message to send")
      .setDisplayText("message")
      .setSnippet("${1:{\"text\": \"message\"\\}}");
  });

module.exports = {
  "1.12": {
    name: "tellraw",
    builder: tellRawCommandBuilder
  }
};