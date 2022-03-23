const { stripIndent } = require("common-tags"),
  CommandBuilder = require("../class/CommandBuilder");

const saveAllCommandBuilder = new CommandBuilder("save-all")
  .setDescription(stripIndent`
  Saves the world to disk.
  - Multiplayer only
  - Requires 'function-permission-level=4' or higher
  `)
  .addStringOption(null, (opt) => {
    opt.setOptional()
      .setText("flush")
      .setDescription("Saves all chunks immediately, freezes server until saved.");
  });

module.exports = {
  "1.12": {
    name: "save-all",
    builder: saveAllCommandBuilder
  }
};