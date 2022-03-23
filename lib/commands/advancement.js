const CommandBuilder = require("../class/CommandBuilder");

const advancementCommandBuilder12 = new CommandBuilder("advancement")
    .setDescription("Grants, revokes, and tests advancements for a target.")
    .addEnumOption("mode", (e) => {
      e.addChoice("grant", "Grants an advancement.")
        .addChoice("revoke", "Revokes an advancement.")
        .addChoice("test", "Tests an advancement.");
    })
    .addSelectorOption("target")
    .addAdvancementOption("advancement")
    .addStringOption("criterion", (opt) => {
      opt.setDescription("The section of the advancement to grant")
        .setSnippet("${1:criterion}")
        .setDisplayText("criterion")
        .setOptional();
    }),

  advancementCommandBuilder13 = new CommandBuilder("advancement")
    .setDescription("Grants and revokes advancements for a target.")
    .addEnumOption("mode", (opt) => {
      opt.addChoice("grant", "Grants an advancement.")
        .addChoice("revoke", "Revokes an advancement.");
    })
    .addSelectorOption("target")
    .addSubCommand("everything", "filter mode", (sub) => {
      sub.setDescription("Includes all advancements.");
    })
    .addSubCommand("only", "filter mode", (sub) => {
      sub.setDescription("Includes a single advancement.")
        .addAdvancementOption("advancement")
        .addStringOption("criterion", (opt) => {
          opt.setSnippet("${1:criterion}")
            .setDisplayText("criterion")
            .setOptional();
        });
    })
    .addEnumOption("filter mode", (opt) => {
      opt.addChoice("from", "Includes an advancement and its children.")
        .addChoice("until", "Includes an advancement and its parents.")
        .addChoice("through", "Includes an advancement and its children, and its parents, and its parents' children.");
    })
    .addAdvancementOption("advancement");

module.exports = {
  "1.12": {
    name: "advancement",
    builder: advancementCommandBuilder12
  },
  "1.13": {
    name: "advancement",
    builder: advancementCommandBuilder13
  }
};