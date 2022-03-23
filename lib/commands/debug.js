const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

// TODO: function option

const debugCommandBuilder12 = new CommandBuilder("debug")
    .setDescription(stripIndent`
  Starts/stops debug sessions.
  - Requires 'function-permission-level=3' or higher
  `)
    .addEnumOption("action", (opt) => {
      opt.setOptional()
        .addChoice("start", "Starts a new debug time profiler session")
        .addChoice("stop", "Stops the active debug time profiler session.");
    }),

  debugCommandBuilder17 = new CommandBuilder("debug")
    .setDescription(stripIndent`
  Starts/stops debug sessions.
  - Requires 'function-permission-level=3' or higher
  `)
    .addSubCommand("function", "action", (sub) => {
      sub.setDescription("Gets debug information about a function.")
        .addStringOption("name", (opt) => {
          opt.setDescription("The function to debug")
            .setDisplayText("name")
            .setSnippet("${1:name}");
        });
    })
    .addEnumOption("action", (opt) => {
      opt.addChoice("start", "Starts a new debug time profiler session")
        .addChoice("stop", "Stops the active debug time profiler session.");
    });

module.exports = {
  "1.12": {
    name: "debug",
    builder: debugCommandBuilder12
  },
  "1.17": {
    name: "debug",
    builder: debugCommandBuilder17
  }
};