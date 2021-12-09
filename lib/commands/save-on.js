const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput");

class SaveOnCommand extends BaseCommand {
  constructor() {super("save-on");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("save-on", "Enables autosave. Multiplayer only; Must set 'function-permission-level=4' or higher.")];
      }
    }
  }
}

module.exports = {
  "1.12": new SaveOnCommand
};
