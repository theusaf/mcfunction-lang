const { CommandBuilder } = require("../class/builders");

const clearCommandBuilder12 = new CommandBuilder("clear")
    .setDescription("Clears items from a player's inventory")
    .addSelectorOption("targets", (opt) => {
      opt.setOptional();
    })
    .addItemOption("item", (opt) => {
      opt.setOptional()
        .setDescription("The item id to remove");
    })
    .addNumberOption("data", (opt) => {
      opt.setOptional()
        .setDescription("The item damage/id number to filter by");
    })
    .addNumberOption("max", (opt) => {
      opt.setOptional()
        .setDescription("The maximum number of items to remove")
        .setDefaultValue("1");
    })
    .addNBTOption("dataTag", (opt) => {
      opt.setOptional()
        .setDescription("The NBT data to filter the items by");
    }),

  clearCommandBuilder13 = new CommandBuilder("clear")
    .setDescription("Clears items from a player's inventory")
    .addSelectorOption("targets", (opt) => {
      opt.setOptional();
    })
    .addItemOption("item", (opt) => {
      opt.setOptional()
        .setDescription("The item name to remove");
    })
    .addNumberOption("max", (opt) => {
      opt.setOptional()
        .setDescription("The maximum number of items to remove")
        .setDefaultValue("1");
    });

module.exports = {
  "1.12": {
    name: "clear",
    builder: clearCommandBuilder12
  },
  "1.13": {
    name: "clear",
    builder: clearCommandBuilder13
  }
};