const { NullCommand } = require("../class/builders"),
  CommandBuilder = require("../class/CommandBuilder");

const statsCommandBuilder = new CommandBuilder("stats")
  .setDescription("Gets stats from command results.")
  .createNamedSection("QUERY", (section) => {
    section.addSubCommand("set", "mode", (sub) => {
      sub.setDescription("Queries and stores stats in an objective")
        .addEnumOption("stat", (opt) => {
          opt.addChoice("AffectedBlocks", "Returns the number of blocks affected by a command.")
            .addChoice("AffectedEntities", "Returns the number of entities affected by a command.")
            .addChoice("AffectedItems", "Returns the number of items affected by a command.")
            .addChoice("QueryResult", "Returns the result of a command query.")
            .addChoice("SuccessCount", "Returns a command's success count.");
        })
        .addSelectorOption("target", (opt) => {
          opt.setDescription("The score holder to store the stat in");
        })
        .addStringOption("objective", (opt) => {
          opt.setDisplayText("objective")
            .setSnippet("${1:objective}")
            .setDescription("The scoreboard objective to store the stat in");
        });
    })
      .addSubCommand("clear", "mode", (sub) => {
        sub.setDescription("Clears a stat.")
          .addEnumOption("stat", (opt) => {
            opt.addChoice("AffectedBlocks", "Returns the number of blocks affected by a command.")
              .addChoice("AffectedEntities", "Returns the number of entities affected by a command.")
              .addChoice("AffectedItems", "Returns the number of items affected by a command.")
              .addChoice("QueryResult", "Returns the result of a command query.")
              .addChoice("SuccessCount", "Returns a command's success count.");
          });
      });
  })
  .addSubCommand("entity", "source type", (sub) => {
    sub.setDescription("Gets stats from an entity.")
      .addSelectorOption("target")
      .addSectionOption("QUERY");
  })
  .addSubCommand("block", "source type", (sub) => {
    sub.setDescription("Gets stats from a block.")
      .addCoordinateOption("block position")
      .addSectionOption("QUERY");
  });

module.exports = {
  "1.12": {
    name: "stats",
    builder: statsCommandBuilder
  },
  "1.13": NullCommand
};