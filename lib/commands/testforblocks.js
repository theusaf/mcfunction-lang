const { NullCommand } = require("../class/builders"),
  CommandBuilder = require("../class/CommandBuilder");

const testForBlocksCommandBuilder = new CommandBuilder("testforblocks")
  .setDescription("Tests an area of blocks against a source area.")
  .addCoordinateOption("source corner 1", 3)
  .addCoordinateOption("source corner 2", 3)
  .addCoordinateOption("destination", 3, (opt) => {
    opt.setDescription("The NW destination corner to test for blocks");
  })
  .addEnumOption("mode", (opt) => {
    opt.setOptional()
      .addChoice("all", "All blocks in the source area must match the destination area.")
      .addChoice("masked", "All blocks in the source area must match the destination area, but air blocks are ignored.");
  });

module.exports = {
  "1.12": {
    name: "testforblocks",
    builder: testForBlocksCommandBuilder
  },
  "1.13": NullCommand
};