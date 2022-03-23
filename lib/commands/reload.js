const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const reloadCommandBuilder12 = new CommandBuilder("reload")
    .setDescription(stripIndent`
  Reloads world resources and datapacks.
  - Requires 'function-permission-level=4' or higher
  `),

  reloadCommandBuilder14 = new CommandBuilder("reload")
    .setDescription(stripIndent`
  Reloads world resources and datapacks.
  `);

module.exports = {
  "1.12": {
    name: "reload",
    builder: reloadCommandBuilder12
  },
  "1.14": {
    name: "reload",
    builder: reloadCommandBuilder14
  }
};