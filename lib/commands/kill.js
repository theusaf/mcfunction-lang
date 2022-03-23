const { CommandBuilder } = require("../class/builders");

const killCommandBuilder12 = new CommandBuilder("kill")
    .setDescription("Kills entities.")
    .addSelectorOption("targets", (opt) => {
      opt.setOptional();
    }),

  killCommandBuilder13 = new CommandBuilder("kill")
    .setDescription("Kills entities.")
    .addSelectorOption("targets");

module.exports = {
  "1.12": {
    name: "kill",
    builder: killCommandBuilder12
  },
  "1.13": {
    name: "kill",
    builder: killCommandBuilder13
  },
  get "1.15"() {
    return module.exports["1.12"];
  }
};