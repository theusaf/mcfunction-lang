const CommandBuilder = require("../class/CommandBuilder");

const titleCommandBuilder = new CommandBuilder("title")
  .setDescription("Creates and interacts with titles and subtitles.")
  .addSelectorOption("targets", (opt) => {
    opt.setDescription("The player(s) on which to manage the titles/subtitles");
  })
  .addSubCommand("clear", "sub command", (sub) => {
    sub.setDescription("Clears the title text for the specified player(s).");
  })
  .addSubCommand("reset", "sub command", (sub) => {
    sub.setDescription("Resets the subtitle text and fade timings for the specified player(s).");
  })
  .addSubCommand("times", "sub command", (sub) => {
    sub.setDescription("Sets the fade timings for the specified player(s).")
      .addNumberOption("fadeIn", (opt) => {
        opt.setDescription("The time in ticks for the title to fade in")
          .setDisplayText("fade in");
      })
      .addNumberOption("stay", (opt) => {
        opt.setDescription("The time in ticks for the title to stay on screen")
          .setDefaultValue("100");
      })
      .addNumberOption("fadeOut", (opt) => {
        opt.setDescription("The time in ticks for the title to fade out")
          .setDisplayText("fade out");
      });
  })
  .addEnumOption("sub command", (opt) => {
    opt.addChoice("title", "Sets the title text for the specified player(s).")
      .addChoice("subtitle", "Sets the subtitle text for the specified player(s).")
      .addChoice("actionbar", "Sets the action bar text for the specified player(s).");
  })
  .addNBTOption("title text", (opt) => {
    opt.setDescription("The raw JSON text to set.")
      .setDisplayText("raw text")
      .setSnippet("${1:{\"text\":\"title text\"\\}}");
  });

module.exports = {
  "1.12": {
    name: "title",
    builder: titleCommandBuilder
  }
};