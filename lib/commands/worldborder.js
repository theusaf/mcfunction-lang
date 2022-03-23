const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const worldBorderCommandBuilder = new CommandBuilder("worldborder")
  .setDescription("Modifies the world border.")
  .addSubCommand("add", (sub) => {
    sub.setDescription("Adds a value to the world border.")
      .addNumberOption("distance", (opt) => {
        opt.setDescription("The distance to add to the world border")
          .setDisplayText("distance")
          .setDefaultValue("1");
      });
  })
  .addSubCommand("set", (sub) => {
    sub.setDescription("Sets the world border.")
      .addNumberOption("distance", (opt) => {
        opt.setDescription("The distance to set the world border")
          .setDisplayText("distance")
          .setDefaultValue("1");
      })
      .addNumberOption("time", (opt) => {
        opt.setDescription("The time in seconds to set the world border")
          .setDisplayText("time")
          .setDefaultValue("5")
          .setOptional();
      });
  })
  .addSubCommand("center", (sub) => {
    sub.setDescription("Sets the center of the world border.")
      .addCoordinateOption("location", 2, (opt) => {
        opt.setDescription("The x and z coordinates of the center of the world border");
      });
  })
  .addSubCommand("warning", (sub) => {
    sub.setDescription("Manages the world border warning settings.")
      .addSubCommand("distance", (sub) => {
        sub.setDescription("Sets the distance to the center of the world border at which the warning is triggered.")
          .addNumberOption("distance", (opt) => {
            opt.setDescription("The distance to the center of the world border at which the warning is triggered")
              .setDisplayText("distance")
              .setDefaultValue("16");
          });
      })
      .addSubCommand("time", (sub) => {
        sub.setDescription("Sets the time in seconds before the warning is triggered.")
          .addNumberOption("time", (opt) => {
            opt.setDescription("The time in seconds before the warning is triggered")
              .setDisplayText("time")
              .setDefaultValue("5");
          });
      });
  })
  .addSubCommand("damage", (sub) => {
    sub.setDescription("Manages the world border damage settings.")
      .addSubCommand("amount", (sub) => {
        sub.setDescription("Sets the amount of damage dealt to entities crossing the world border.")
          .addNumberOption("amount", (opt) => {
            opt.setDescription(stripIndent`
            The amount of damage dealt to entities crossing the world border
            - This is multiplied by the distance to the border's buffer.
            `)
              .setDisplayText("amount")
              .setDefaultValue("1");
          });
      })
      .addSubCommand("buffer", (sub) => {
        sub.setDescription("Sets the distance from the world border at which entities are not damaged.")
          .addNumberOption("distance", (opt) => {
            opt.setDescription("The distance from the world border at which entities are not damaged")
              .setDisplayText("distance")
              .setDefaultValue("0");
          });
      });
  });

module.exports = {
  "1.12": {
    name: "worldborder",
    builder: worldBorderCommandBuilder
  }
};
