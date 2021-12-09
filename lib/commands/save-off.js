const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput");

class SaveOffCommand extends BaseCommand {
  constructor() {super("save-off");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("save-off", "Disables autosave. Multiplayer only; Must set 'function-permission-level=4' or higher.")];
      }
    }
  }
}

module.exports = {
  "1.12": new SaveOffCommand
};
