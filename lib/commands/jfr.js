const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class JFRCommand extends BaseCommand {

  constructor() {super("jfr");}

  handleSuggestions(tokens) {
    switch (tokens) {
      case 1: {
        return [new CommandNameOutput("jfr", "Starts profiling using the Java FlightRecorder. Must set 'function-permission-level=4' or higher.")];
      }
      case 2: {
        return [new EnumOutput(
          ["start", "Action", "Start JFR profiling"],
          ["stop", "Action", "Stop JFR profiling"]
        )];
      }
    }
  }

}

module.exports = {
  "1.18": new JFRCommand
};