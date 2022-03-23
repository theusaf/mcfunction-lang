const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const banlistCommandBuilder = new CommandBuilder("banlist")
  .setDescription(stripIndent`
  Retrieves the list of banned players.
  - Multiplayer only
  - Requires 'function-permission-level=3' or higher
  `)
  .addEnumOption("type", (opt) => {
    opt.setOptional()
      .addChoice("ips", "Returns the ip-ban list.")
      .addChoice("players", "Returns the player ban list.");
  });

module.exports = {
  "1.12": {
    name: "banlist",
    builder: banlistCommandBuilder
  }
};