const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class PerfCommand extends BaseCommand {

  constructor() {super("perf");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("perf", "Captures information about the game. Multiplayer only; Must set 'function-permission-level=4' or higher.")];
      }
      case 2: {
        return [new EnumOutput(
          ["start", "Action", "record metrics for 10 seconds"],
          ["stop", "Action", "stop the performance recording"]
        )];
      }
    }
  }

}

module.exports = {
  "1.17": new PerfCommand
};