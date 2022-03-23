const { CommandBuilder } = require("../class/builders");

// TODO: use functions from file path

const functionCommandBuilder12 = new CommandBuilder("function")
    .addStringOption("name", (opt) => {
      opt.setDescription("The function name to run")
        .setDisplayText("function name")
        .setSnippet("${1:namespace}:${2:name}");
    })
    .addEnumOption("entity conditional", (opt) => {
      opt.setOptional()
        .addChoice("if", "Will run if the entity selector matches.")
        .addChoice("else", "Will run if the entity selector does not match.");
    })
    .addSelectorOption("target", (opt) => {
      opt.setDescription("The selector to check for");
    }),

  functionCommandBuilder13 = new CommandBuilder("function")
    .addStringOption("name", (opt) => {
      opt.setDescription("The function name to run")
        .setDisplayText("function name")
        .setSnippet("${1:namespace}:${2:name}");
    });

module.exports = {
  "1.12": {
    name: "function",
    builder: functionCommandBuilder12
  },
  "1.13": {
    name: "function",
    builder: functionCommandBuilder13
  }
};