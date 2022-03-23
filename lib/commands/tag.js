const CommandBuilder = require("../class/CommandBuilder");

const tagCommandBuilder = new CommandBuilder("tag")
  .setDescription("Manages tags.")
  .addSelectorOption("targets")
  .addEnumOption("sub command", (opt) => {
    opt.addChoice("add", "Adds tags to entitites.")
      .addChoice("remove", "Removes tags from entities.")
      .addChoice("list", "Lists tags on entities.");
  })
  .addSectionOption((section) => {
    const token = section.getPreviousToken();
    if (token === "add" || token === "remove") {
      section.addStringOption("tag", (opt) => {
        opt.setDescription("The name of the tag")
          .setDisplayText("tag")
          .setSnippet("${1:tag}");
      });
    }
  });

module.exports = {
  "1.13": {
    name: "tag",
    builder: tagCommandBuilder
  }
};