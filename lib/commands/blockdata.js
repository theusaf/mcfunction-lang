const { CommandBuilder, NullCommand } = require("../class/builders");

const blockdataCommandBuilder = new CommandBuilder("blockdata")
  .setDescription("Modifies the NBT data of a block.")
  .addCoordinateOption("location", 3)
  .addNBTOption("dataTag", (opt) => {
    opt.setDisplayText("dataTag"); 
  });

module.exports = {
  "1.12": {
    name: "blockdata",
    builder: blockdataCommandBuilder
  },
  "1.13": NullCommand
};