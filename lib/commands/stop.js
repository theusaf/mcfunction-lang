const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput");

class StopCommand extends BaseCommand {
  constructor() {super("stop");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("stop", "Saves changes and shuts down the server. Multiplayer only; Must set 'function-permission-level=4' or higher.")];
      }
    }
  }
}

module.exports = {
  "1.12": new StopCommand
};
