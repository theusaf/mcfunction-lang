const { CommandBuilder } = require("../class/builders"),
  { stripIndent } = require("common-tags");

const jfrCommandBuilder = new CommandBuilder("jfr")
  .setDescription(stripIndent`
  Starts profiling using the Java FlightRecorder.
  - Requires 'function-permission-level=4' or higher.
  `)
  .addEnumOption("action", (opt) => {
    opt.addChoice("start", "Starts JFR profiling.")
      .addChoice("stop", "Stops JFR profiling.");
  });

module.exports = {
  "1.18": {
    name: "jfr",
    builder: jfrCommandBuilder
  }
};