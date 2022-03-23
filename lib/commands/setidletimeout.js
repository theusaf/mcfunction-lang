const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const setIdleTimeoutCommandBuilder = new CommandBuilder("setidletimeout")
  .setDescription(stripIndent`
  Sets the idle timeout before players are kicked.
  - Multiplayer only
  - Requries 'function-permission-level=3' or higher.
  `)
  .addNumberOption("minutes", (opt) => {
    opt.setDefaultValue("10");
  });

module.exports = {
  "1.12": {
    name: "setidletimeout",
    builder: setIdleTimeoutCommandBuilder
  }
};