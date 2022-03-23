const { CommandBuilder } = require("../class/builders");

const itemCommandBuilder = new CommandBuilder("item")
  .setDescription("Interacts with items in inventories of blocks and entities.")
  .createNamedSection("TARGET", (section) => {
    section.addSubCommand("block", (sub) => {
      sub.setDescription("Uses a block as the target.")
        .addCoordinateOption("position", 3);
    })
      .addSubCommand("entity", (sub) => {
        sub.setDescription("Uses one or more entities as the target.")
          .addSelectorOption("targets", (opt) => {
            opt.setDescription("The entities to affect");
          });
      });
  })
  .createNamedSection("SOURCE", (section) => {
    section.addSubCommand("block", (sub) => {
      sub.setDescription("Uses a block as the source.")
        .addCoordinateOption("position", 3);
    })
      .addSubCommand("entity", (sub) => {
        sub.setDescription("Uses an entity as the source.")
          .addSelectorOption("target", (opt) => {
            opt.setDescription("The entity to source from");
          });
      });
  })
  .addSubCommand("modify", "sub command", (sub) => {
    sub.setDescription("Modifies an item in a slot using a modifier.")
      .addSectionOption("TARGET")
      .addSlotOption("slot")
      .addStringOption("modifier", (opt) => {
        opt.setDescription("The modifier to apply")
          .setDisplayText("modifier")
          .setSnippet("${1:modifier}");
      });
  })
  .addSubCommand("replace", "sub command", (sub) => {
    sub.setDescription("Replaces an item in a slot with a new item or copied from another location.")
      .addSectionOption("TARGET")
      .addSlotOption("slot")
      .addSubCommand("with", "source mode", (sub) => {
        sub.setDescription("Replaces the target slot with a specified item.")
          .addItemOption("item")
          .addNumberOption("count", (opt) => {
            opt.setOptional()
              .setDisplayText("count")
              .setDefaultValue("64")
              .setDescription("The number of items to put");
          });
      })
      .addSubCommand("from", "source mode", (sub) => {
        sub.setDescription("Replaces the target slot with an item from another location.")
          .addSectionOption("SOURCE")
          .addSlotOption("sourceSlot")
          .addStringOption("modifier", (opt) => {
            opt.setDescription("The modifier to apply")
              .setDisplayText("modifier")
              .setSnippet("${1:modifier}")
              .setOptional();
          });
      });
  });

module.exports = {
  "1.17": {
    name: "item",
    builder: itemCommandBuilder
  }
};