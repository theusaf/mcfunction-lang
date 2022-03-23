const { CommandBuilder } = require("../class/builders");

const lootCommandBuilder = new CommandBuilder("loot")
  .setDescription("Drops the given loot table into the specified inventory or the world.")
  .createNamedSection("REPLACE_TARGET", (section) => {
    section.addSubCommand("entity", (sub) => {
      sub.setDescription("Distributes items into entities.")
        .addSelectorOption("entities");
    })
      .addSubCommand("block", (sub) => {
        sub.setDescription("Distributes items into a container block.")
          .addCoordinateOption("targetPos", 3);
      });
  })
  .createNamedSection("TARGET", (section) => {
    section.addSubCommand("spawn", (sub) => {
      sub.setDescription("Spawns item entities.")
        .addCoordinateOption("targetPos", 3, (opt) => {
          opt.setDescription("The position to spawn the items at.");
        });
    })
      .addSubCommand("replace", (sub) => {
        sub.setDescription("Replaces slots in something with looted items.")
          .addSectionOption("REPLACE_TARGET")
          .addSlotOption("slot")
          .addNumberOption("count", (opt) => {
            opt.setOptional()
              .setDisplayText("count")
              .setDescription("The number of consecutive slots to be filled");
          });
      })
      .addSubCommand("give", (sub) => {
        sub.setDescription("Gives items to players.")
          .addSelectorOption("players");
      })
      .addSubCommand("insert", (sub) => {
        sub.setDescription("Distributes items to a container block.")
          .addCoordinateOption("targetPos", 3);
      });
  })
  .createNamedSection("SOURCE", (section) => {
    section.addSubCommand("fish", (sub) => {
      sub.setDescription("Retrieves the loot from a loot table as if the loot were fished.") 
        .addLootTableOption("loot table")
        .addCoordinateOption("position", 3, (opt) => {
          opt.setDescription("The block position being fished from");
        })
        .addStringOption("tool", (opt) => {
          opt.setText("mainhand")
            .setParallel()
            .setOptional();
        })
        .addStringOption("tool", (opt) => {
          opt.setText("offhand")
            .setParallel()
            .setOptional();
        })
        .addItemOption("tool", (opt) => opt.setOptional());
    })
      .addSubCommand("loot", (sub) => {
        sub.setDescription("Retrieves the loot from a specific loot table.")
          .addLootTableOption("loot table");
      })
      .addSubCommand("kill", (sub) => {
        sub.setDescription("Retrieves the loot from an entity as if the target was killed.")
          .addSelectorOption("target", (opt) => {
            opt.setDescription("The singular target to simulate killing");
          });
      })
      .addSubCommand("mine", (sub) => {
        sub.setDescription("Retrieves the loot from a block as if the block was mined.")
          .addCoordinateOption("position", 3)
          .addStringOption("tool", (opt) => {
            opt.setText("mainhand")
              .setParallel()
              .setOptional();
          })
          .addStringOption("tool", (opt) => {
            opt.setText("offhand")
              .setParallel()
              .setOptional();
          })
          .addItemOption("tool", (opt) => opt.setOptional());
      });
  })
  .addSectionOption("TARGET")
  .addSectionOption("SOURCE");

module.exports = {
  "1.14": {
    name: "loot",
    builder: lootCommandBuilder
  }
};