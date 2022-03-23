const { CommandBuilder } = require("../class/builders");

const helpCommandBuilder12 = new CommandBuilder("help")
    .addAlias("?")
    .setDescription("Gets help for commands.")
    .addNumberOption("page", (opt) => {
      opt.setOptional()
        .setParallel()
        .setDescription("Specifies which page of the help list to display.")
        .setDefaultValue("1")
        .setDisplayText("page")
        .setType("int");
    })
    .addStringOption("command", (opt) => {
      opt.setOptional()
        .setDescription("The command to get help for")
        .setDisplayText("command name")
        .setSnippet("${1:command}");
    }),

  helpCommandBuilder13 = new CommandBuilder("help")
    .addAlias("?")
    .setDescription("Gets help for commands.")
    .createNamedSection("GREEDY_COMMAND", (section) => {
      section.addStringOption("command", (opt) => {
        opt.setOptional()
          .setDescription("The command (and sub commands) to get help for")
          .setDisplayText("command")
          .setSnippet("${1:command}");
      })
        .addSectionOption((section) => {
          section.addSectionOption("GREEDY_COMMAND");
        });
    })
    .addSectionOption("GREEDY_COMMAND");

module.exports = {
  "1.12": {
    name: ["help", "?"],
    builder: helpCommandBuilder12
  },
  "1.13": {
    name: ["help", "?"],
    builder: helpCommandBuilder13
  }
};