const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class KickCommand extends BaseCommand {
  constructor() {super("kick");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("kick", "Kicks players from a server. Multiplayer only; Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [
          new SelectorOutput(null, "players")
        ];
      }
      case 3: {
        return [
          (new StringOutput("$1", null, true, "reason")).optional(),
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new KickCommand
};
