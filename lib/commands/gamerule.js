const { CommandBuilder } = require("../class/builders");

const gameruleCommandBuilder = new CommandBuilder("gamerule")
  .setDescription("Interacts with the world game rules.")
  .addGameruleOption("game rule")
  .addStringOption("value", (opt) => {
    opt.setOptional()
      .setDisplayText("value")
      .setDescription("Sets the game rule. If omitted, queries the game rule.")
      .setSnippet("${1:value}");
  });

module.exports = {
  "1.12": {
    name: "gamerule",
    builder: gameruleCommandBuilder
  }
};