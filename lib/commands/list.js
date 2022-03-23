const { CommandBuilder } = require("../class/builders"),
  { stripIndent } = require("common-tags");

const listCommandBuilder12 = new CommandBuilder("list")
    .setDescription(stripIndent`
  Gets the player list.
  - Multiplayer only
  `)
    .addStringOption("mode", (opt) => {
      opt.setText("uuids")
        .setDescription("Shows uuids alongside the player names.")
        .setOptional();
    }),

  listCommandBuilder13 = new CommandBuilder("list")
    .setDescription(stripIndent`
  Gets the player list.
  `)
    .addStringOption("mode", (opt) => {
      opt.setText("uuids")
        .setDescription("Shows uuids alongside the player names.")
        .setOptional();
    });

module.exports = {
  "1.12": {
    name: "list",
    builder: listCommandBuilder12
  },
  "1.13": {
    name: "list",
    builder: listCommandBuilder13
  }
};