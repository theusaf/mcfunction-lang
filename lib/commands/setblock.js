const CommandBuilder = require("../class/CommandBuilder");

const setBlockCommandBuilder12 = new CommandBuilder("setblock")
    .setDescription("Sets a block a position.")
    .addCoordinateOption("position", 3)
    .addBlockOption("block")
    .addStringOption("data/state", (opt) => {
      opt.setSnippet("${1:state}")
        .setDescription("The state or numerical variant of the block")
        .setDisplayText("state")
        .setOptional();
    })
    .addEnumOption("mode", (opt) => {
      opt.setOptional()
        .addChoice("destroy", "Destroys the block before setting it.")
        .addChoice("keep", "Only replaces an air block.")
        .addChoice("replace", "Replaces the block. (default behavior)");
    })
    .addNBTOption("nbt", (opt) => {
      opt.setOptional();
    }),

  setBlockCommandBuilder13 = new CommandBuilder("setblock")
    .setDescription("Sets a block a position.")
    .addCoordinateOption("position", 3)
    .addBlockOption("block")
    .addEnumOption("mode", (opt) => {
      opt.setOptional()
        .addChoice("destroy", "Destroys the block before setting it.")
        .addChoice("keep", "Only replaces an air block.")
        .addChoice("replace", "Replaces the block. (default behavior)");
    });

module.exports = {
  "1.12": {
    name: "setblock",
    builder: setBlockCommandBuilder12
  },
  "1.13": {
    name: "setblock",
    builder: setBlockCommandBuilder13
  }
};