const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const whiteListCommandBuilder = new CommandBuilder("whitelist")
  .setDescription(stripIndent`
  Adds or removes players from the whitelist.
  - Multiplayer only
  - Requires 'function-permission-level=3' or higher.
  `)
  .addSubCommand("add", (sub) => {
    sub.setDescription("Adds a player to the whitelist.")
      .addSelectorOption("players", (opt) => {
        opt.setDescription("The players to add to the whitelist.");
      });
  })
  .addSubCommand("remove", (sub) => {
    sub.setDescription("Removes a player from the whitelist.")
      .addSelectorOption("players", (opt) => {
        opt.setDescription("The players to remove from the whitelist.");
      });
  })
  .addSubCommand("list", (sub) => {
    sub.setDescription("Lists all players on the whitelist.");
  })
  .addSubCommand("off", (sub) => {
    sub.setDescription("Disables the whitelist.");
  })
  .addSubCommand("on", (sub) => {
    sub.setDescription("Enables the whitelist.");
  })
  .addSubCommand("reload", (sub) => {
    sub.setDescription("Reloads the whitelist from disk.");
  });

module.exports = {
  "1.12": {
    name: "whitelist",
    builder: whiteListCommandBuilder
  }
};
