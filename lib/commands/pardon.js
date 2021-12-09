const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class PardonCommand extends BaseCommand {
  constructor() {super("pardon");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("pardon", "Removes banned players from the ban list. Multiplayer only; Must set 'function-permission-level=3' or higher; Uncertain if this would work in a function.")];
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
  "1.12": new PardonCommand
};
