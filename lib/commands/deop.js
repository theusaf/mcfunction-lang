const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class DeopCommand extends BaseCommand {
  constructor() {super("deop");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("deop", "Removes operator permissions from players. Multiplayer only; Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [
          new SelectorOutput(null, "targets")
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new DeopCommand
};
