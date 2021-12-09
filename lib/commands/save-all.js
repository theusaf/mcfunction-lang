const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput");

class SaveAllCommand extends BaseCommand {
  constructor() {super("save-all");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("save-all", "Saves the world to disk. Multiplayer only; Must set 'function-permission-level=4' or higher.")];
      }
      case 2: {
        return [(new StringOutput("flush", "Saves all chunks immediately, freezes server until saved.")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new SaveAllCommand
};
