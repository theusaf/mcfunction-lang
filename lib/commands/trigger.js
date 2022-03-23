const CommandBuilder = require("../class/CommandBuilder");

const triggerCommandBuilder12 = new CommandBuilder("trigger")
    .setDescription("Modifies scoreboard objectives with the trigger criterion.")
    .addStringOption("objective", (opt) => {
      opt.setDescription("The name of the objective to modify")
        .setDisplayText("objective")
        .setSnippet("${1:objective}");
    })
    .addEnumOption("sub command", (opt) => {
      opt.addChoice("add", "Adds a value to the objective.")
        .addChoice("set", "Sets the value of the objective.");
    })
    .addSectionOption((section) => {
      const token = section.getPreviousToken();
      if (token === "add" || token === "set") {
        section.addNumberOption("value", (opt) => {
          opt.setDescription("The value to add or set.")
            .setDisplayText("value")
            .setDefaultValue("1");
        });
      }
    }),

  triggerCommandBuilder13 = new CommandBuilder("trigger")
    .setDescription("Modifies scoreboard objectives with the trigger criterion.")
    .addStringOption("objective", (opt) => {
      opt.setDescription("The name of the objective to modify")
        .setDisplayText("objective")
        .setSnippet("${1:objective}");
    })
    .addEnumOption("sub command", (opt) => {
      opt.setOptional()
        .addChoice("add", "Adds a value to the objective.")
        .addChoice("set", "Sets the value of the objective.");
    })
    .addSectionOption((section) => {
      const token = section.getPreviousToken();
      if (token === "add" || token === "set") {
        section.addNumberOption("value", (opt) => {
          opt.setDescription("The value to add or set.")
            .setDisplayText("value")
            .setDefaultValue("1");
        });
      }
    });

module.exports = {
  "1.12": {
    name: "trigger",
    builder: triggerCommandBuilder12
  },
  "1.13": {
    name: "trigger",
    builder: triggerCommandBuilder13
  }
};