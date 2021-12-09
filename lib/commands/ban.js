const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class BanCommand extends BaseCommand {
  constructor() {super("ban");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("ban", "Ban players from a server. Multiplayer only; Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
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
  "1.12": new BanCommand
};
