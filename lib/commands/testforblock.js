const { NullCommand } = require("../class/builders"),
  CommandBuilder = require("../class/CommandBuilder");

const testForBlockCommandBuilder = new CommandBuilder("testforblock")
  .setDescription("Tests for the existence of a block.")
  .addCoordinateOption("location", 3)
  .addBlockOption("block")
  .addNumberOption("data", (opt) => {
    opt.setOptional()
      .setDescription("The block damage/variant value to test for");
  });

module.exports = {
  "1.12": {
    name: "testforblock",
    builder: testForBlockCommandBuilder
  },
  "1.13": NullCommand
};