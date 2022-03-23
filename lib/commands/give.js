const { CommandBuilder } = require("../class/builders");

const giveCommandBuilder12 = new CommandBuilder("give")
    .setDescription("Give items to players")
    .addSelectorOption("players")
    .addItemOption("item")
    .addNumberOption("count", (num) => {
      num.setDefaultValue("64")
        .setDisplayText("count")
        .setOptional();
    })
    .addNumberOption("data", (num) => {
      num.setDisplayText("data")
        .setOptional()
        .setDescription("Sets the damage on items or the variant of an item.");
    })
    .addNBTOption("dataTag", (nbt) => {
      nbt.setOptional()
        .setDisplayText("NBT Data")
        .setDescription("Sets the NBT data on the item");
    }),
    
  giveCommandBuilder13 = new CommandBuilder("give")
    .setDescription("Give items to playetrs")
    .addSelectorOption("players")
    .addItemOption("item")
    .addNumberOption("count", (num) => {
      num.setDefaultValue("64")
        .setDisplayText("count")
        .setOptional();
    });

module.exports = {
  "1.12": {
    name: "give",
    builder: giveCommandBuilder12
  },
  "1.13": {
    name: "give",
    builder: giveCommandBuilder13
  }
};