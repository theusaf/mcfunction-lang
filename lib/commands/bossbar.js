const { CommandBuilder } = require("../class/builders");

const bossbarCommandBuilder = new CommandBuilder("bossbar")
  .setDescription("Modifies and interacts with bossbars.")
  .addSubCommand("add", "sub command", (sub) => {
    sub.setDescription("Creates a new boss bar.")
      .addStringOption("id", (opt) => {
        opt.setSnippet("${1:id}")
          .setDisplayText("id")
          .setDescription("The bossbar id");
      })
      .addStringOption("name", (opt) => {
        opt.setDisplayText("name")
          .setSnippet("${1:{\"text\":\"bossbar name\"\\}}")
          .setDescription("The JSON display text for the bossbar");
      });
  })
  .addSubCommand("get", "sub command", (sub) => {
    sub.setDescription("Gets information about a bossbar.")
      .addStringOption("id", (opt) => {
        opt.setDisplayText("id")
          .setDescription("The bossbar id to get information about")
          .setSnippet("${1:id}");
      })
      .addEnumOption("type", (opt) => {
        opt.addChoice("max", "Gets the maximum value of the bossbar.")
          .addChoice("players", "Gets the players of the bossbar.")
          .addChoice("value", "Gets the value of the bossbar")
          .addChoice("visible", "Gets whether the bossbar is visible or not.");
      });
  })
  .addSubCommand("list", "sub command", (sub) => {
    sub.setDescription("Lists bossbars.");
  })
  .addSubCommand("remove", "sub command", (sub) => {
    sub.setDescription("Removes a bossbar.")
      .addStringOption("id", (opt) => {
        opt.setDisplayText("id")
          .setDescription("The bossbar id to remove")
          .setSnippet("${1:id}");
      });
  })
  .addSubCommand("set", "sub command", (sub) => {
    sub.setDescription("Modifies bossbar settings.")
      .addStringOption("id", (opt) => {
        opt.setDisplayText("id")
          .setDescription("The bossbar id to modify")
          .setSnippet("${1:id}");
      })
      .addSubCommand("color", "set type", (sub) => {
        sub.setDescription("Sets the text color of the bossbar.")
          .addEnumOption("color", (opt) => {
            opt.addChoice("blue")
              .addChoice("green")
              .addChoice("pink")
              .addChoice("purple")
              .addChoice("red")
              .addChoice("white")
              .addChoice("yellow");
          });
      })
      .addSubCommand("max", "set type", (sub) => {
        sub.setDescription("Sets the bossbar's maximum value.")
          .addNumberOption("max", (opt) => {
            opt.setDefaultValue("100")
              .setDisplayText("max");
          });
      })
      .addSubCommand("name", "set type", (sub) => {
        sub.setDescription("Sets the bossbar's name.")
          .addStringOption("name", (opt) => {
            opt.setDisplayText("name")
              .setSnippet("${1:{\"text\":\"bossbar name\"\\}}")
              .setDescription("The JSON display text for the bossbar");
          });
      })
      .addSubCommand("players", "set type", (sub) => {
        sub.setDescription("Sets the players whom the bossbar is visible to.")
          .addSelectorOption("targets");
      })
      .addSubCommand("style", "set type", (sub) => {
        sub.setDescription("Sets the bossbar's visual segmentation style.")
          .addEnumOption("style", (opt) => {
            opt.addChoice("notched_6", "A style with 6 segments")
              .addChoice("notched_10", "A style with 10 segments")
              .addChoice("notched_12", "A style with 12 segments")
              .addChoice("notched_20", "A style with 20 segments")
              .addChoice("progress", "A style with no segments; continuous");
          });
      })
      .addSubCommand("value", "set type", (sub) => {
        sub.setDescription("Sets the bossbar's value.")
          .addNumberOption("value", (opt) => {
            opt.setDisplayText("value");
          });
      })
      .addSubCommand("visible", "set type", (sub) => {
        sub.setDescription("Sets whether the bossbar is visible or not.")
          .addBooleanOption("visibility");
      });
  });

module.exports = {
  "1.13": {
    name: "bossbar",
    builder: bossbarCommandBuilder
  }
};