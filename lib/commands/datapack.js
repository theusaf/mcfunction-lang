const { CommandBuilder } = require("../class/builders");

// TODO: Add a datapack option, which reads datapacks from the file system

const datapackCommandBuilder = new CommandBuilder("datapack")
  .setDescription("Controls the loading and unloading of datapacks.")
  .addSubCommand("enable", "sub command", (sub) => {
    sub.setDescription("Enables a datapack")
      .addStringOption("name", (opt) => {
        opt.setDescription("The name of the datapack to enable")
          .setDisplayText("name")
          .setSnippet("${1:name}");
      })
      .addSubCommand("first", "priority", (sub) => {
        sub.setDescription("Enables the datapack, using the highest priority, so that the datapack will run first upon load.")
          .setOptional();
      })
      .addSubCommand("last", "priority", (sub) => {
        sub.setDescription("Enables the datapack, using the lowest priority, so that the datapack will run last upon load.")
          .setOptional();
      })
      .addEnumOption("priority", (opt) => {
        opt.setOptional()
          .addChoice("before", "Enables the datapack with a priority lower than another datapack, and will run after that datapack.")
          .addChoice("after", "Enables the datapack with a priority higher than another datapack, and will run before that datapack.");
      })
      .addStringOption("existing", (opt) => {
        opt.setDisplayText("existing datapack name")
          .setSnippet("${1:name}");
      });
  })
  .addSubCommand("list", "sub command", (sub) => {
    sub.setDescription("Lists datapacks.")
      .addEnumOption("type", (opt) => {
        opt.setOptional()
          .addChoice("available", "All available datapacks")
          .addChoice("enabled", "All enabled datapacks");
      });
  })
  .addSubCommand("disable", "sub command", (sub) => {
    sub.setDescription("Disbales a datapack.")
      .addStringOption("name", (opt) => {
        opt.setDisplayText("name")
          .setDescription("The datapack to disable")
          .setSnippet("${1:name}");
      });
  });

module.exports = {
  "1.13": {
    name: "datapack",
    builder: datapackCommandBuilder
  }
};