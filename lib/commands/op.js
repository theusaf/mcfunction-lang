const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class OpCommand extends BaseCommand {
  constructor() {super("op");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("op", "Grants operator permissions from players. Multiplayer only; Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [
          new SelectorOutput(null, "players")
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new OpCommand
};
