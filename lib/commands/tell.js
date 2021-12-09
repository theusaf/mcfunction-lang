const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class TellCommand extends BaseCommand {
  constructor() {super(["tell", "w", "msg"]);}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [
          new CommandNameOutput("tell", "Sends a private message to one or more players."),
          new CommandNameOutput("w", "Sends a private message to one or more players."),
          new CommandNameOutput("msg", "Sends a private message to one or more players.")
        ];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
      }
      default: {
        return [new StringOutput("$1", null, true, "message")];
      }
    }
  }
}

module.exports = {
  "1.12": new TellCommand
};
