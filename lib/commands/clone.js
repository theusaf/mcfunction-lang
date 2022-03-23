const { CommandBuilder } = require("../class/builders");

const cloneCommandBuilder12 = new CommandBuilder("clone")
    .setDescription("Clones blocks from one location to another.")
    .addCoordinateOption("source corner 1", 3)
    .addCoordinateOption("source corner 2", 3)
    .addCoordinateOption("destination", 3)
    .addEnumOption("mask mode", (opt) => {
      opt.setOptional()
        .addChoice("replace", "Replaces all blocks with the cloned blocks.")
        .addChoice("masked", "Copies all non-air blocks to the location.")
        .addChoice("filtered", "Copies all blocks with the specified id/data");
    })
    .addEnumOption("clone mode", (opt) => {
      opt.setOptional()
        .addChoice("force", "Forces the clone even if the source and destination overlap.")
        .addChoice("normal", "Clones the source, prevening cloning if the source and destination overlap.")
        .addChoice("move", "Clones the source, and removes the source with air.");
    })
    .addSectionOption((section) => {
    // If the mask mode is filtered
      if (section.tokens[10] === "filtered") {
        section.addBlockOption("block filter", (opt) => {
          opt.setOptional()
            .setDescription("The block id to clone/filter from the source");
        })
          .addNumberOption("data", (opt) => {
            opt.setOptional()
              .setParallel()
              .setDisplayText("data")
              .setDescription("The block damage/variety number to filter the blocks by");
          })
          .addStringOption("state", (opt) => {
            opt.setOptional()
              .setDisplayText("state")
              .setSnippet("${1:key=value}")
              .setDescription("The block state to filter the blocks by");
          });
      }
    }),


  cloneCommandBuilder13 = new CommandBuilder("clone")
    .setDescription("Clones blocks from one location to another.")
    .addCoordinateOption("source corner 1", 3)
    .addCoordinateOption("source corner 2", 3)
    .addCoordinateOption("destination", 3)
    .addEnumOption("mask mode", (opt) => {
      opt.setOptional()
        .addChoice("replace", "Replaces all blocks with the cloned blocks.")
        .addChoice("masked", "Copies all non-air blocks to the location.")
        .addChoice("filtered", "Copies all blocks with the specified id/data");
    })
    .addEnumOption("clone mode", (opt) => {
      opt.setOptional()
        .addChoice("force", "Forces the clone even if the source and destination overlap.")
        .addChoice("normal", "Clones the source, prevening cloning if the source and destination overlap.")
        .addChoice("move", "Clones the source, and removes the source with air.");
    })
    .addSectionOption((section) => {
    // If the mask mode is filtered
      if (section.getTokens()[10] === "filtered") {
        section.addBlockOption("block filter", (opt) => {
          opt.setOptional()
            .setDescription("The block id to clone/filter from the source");
        });
      }
    });

module.exports = {
  "1.12": {
    name: "clone",
    builder: cloneCommandBuilder12
  },
  "1.13": {
    name: "clone",
    builder: cloneCommandBuilder13
  }
};