const CommandBuilder = require("../class/CommandBuilder");

const xpCommandBuilder12 = new CommandBuilder("xp")
    .setDescription("Modifies the level and experience of players.")
    .addNumberOption("amount", (opt) => {
      opt.setDescription("The amount of experience to add or remove.")
        .setDisplayText("amount")
        .setDefaultValue("100")
        .setParallel();
    })
    .addStringOption("levels", (opt) => {
      opt.setDescription("The amount of levels to add or remove.")
        .setDisplayText("levels")
        .setSnippet("${1:1}L");
    }),

  xpCommandBuilder13 = new CommandBuilder("xp")
    .addAlias("experience")
    .setDescription("Modifies the level and experience of players.")
    .addSubCommand("add", (sub) => {
      sub.setDescription("Adds experience to players.")
        .addSelectorOption("players", (opt) => {
          opt.setDescription("The players to add experience to");
        })
        .addNumberOption("amount", (opt) => {
          opt.setDescription("The amount to add")
            .setDisplayText("amount")
            .setDefaultValue("1");
        })
        .addEnumOption("metric", (opt) => {
          opt.addChoice("levels")
            .addChoice("points");
        });
    })
    .addSubCommand("set", (sub) => {
      sub.setDescription("Sets the experience of players.")
        .addSelectorOption("players", (opt) => {
          opt.setDescription("The players to set experience to");
        })
        .addNumberOption("amount", (opt) => {
          opt.setDescription("The amount to set to")
            .setDisplayText("amount")
            .setDefaultValue("1");
        })
        .addEnumOption("metric", (opt) => {
          opt.addChoice("levels")
            .addChoice("points");
        });
    })
    .addSubCommand("query", (sub) => {
      sub.setDescription("Queries the experience of players.")
        .addSelectorOption("players", (opt) => {
          opt.setDescription("The players to query");
        })
        .addEnumOption("metric", (opt) => {
          opt.addChoice("levels")
            .addChoice("points");
        });
    });

module.exports = {
  "1.12": {
    name: "xp",
    builder: xpCommandBuilder12
  },
  "1.13": {
    name: [ "xp", "experience" ],
    builder: xpCommandBuilder13
  }
};