const { CommandBuilder, NullCommand } = require("../class/builders");

const entityDataCommandBuilder12 = new CommandBuilder("entitydata")
  .setDescription("Modifies entity NBT data.")
  .addSelectorOption("targets")
  .addNBTOption("dataTag", (opt) => {
    opt.setDescription("The NBT data used to modify the targets")
      .setDisplayText("nbt data");
  });

module.exports = {
  "1.12": {
    name: "entitydata",
    builder: entityDataCommandBuilder12
  },
  "1.13": NullCommand
};