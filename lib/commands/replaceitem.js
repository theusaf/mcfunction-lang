const { NullCommand } = require("../class/builders"),
  CommandBuilder = require("../class/CommandBuilder");

const replaceItemCommandBuilder12 = new CommandBuilder("replaceitem")
    .setDescription("Replaces items in entities and blocks.")
    .createNamedSection("ITEM", (section) => {
      section.addSlotOption("slot")
        .addItemOption("item")
        .addNumberOption("count", (opt) => {
          opt.setDefaultValue("1")
            .setOptional();
        })
        .addNumberOption("data", (opt) => {
          opt.setOptional()
            .setDescription("The damage/variant number of the item");
        })
        .addNBTOption("nbt", (opt) => {
          opt.setOptional();
        });
    })
    .addSubCommand("block", "target type", (sub) => {
      sub.addCoordinateOption("block position", 3)
        .addSectionOption("ITEM");
    })
    .addSubCommand("entity", "target type", (sub) => {
      sub.addSelectorOption("entity")
        .addSectionOption("ITEM");
    }),

  replaceItemCommandBuilder13 = new CommandBuilder("replaceitem")
    .setDescription("Replaces items in entities and blocks.")
    .createNamedSection("ITEM", (section) => {
      section.addSlotOption("slot")
        .addItemOption("item")
        .addNumberOption("count", (opt) => {
          opt.setDefaultValue("1")
            .setOptional();
        });
    })
    .addSubCommand("block", "target type", (sub) => {
      sub.addCoordinateOption("block position", 3)
        .addSectionOption("ITEM");
    })
    .addSubCommand("entity", "target type", (sub) => {
      sub.addSelectorOption("entity")
        .addSectionOption("ITEM");
    });

module.exports = {
  "1.12": {
    name: "replaceitem",
    builder: replaceItemCommandBuilder12
  },
  "1.13": {
    name: "replaceitem",
    builder: replaceItemCommandBuilder13
  },
  "1.17": NullCommand
};