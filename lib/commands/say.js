const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class SayCommand extends BaseCommand {
  constructor() {super("say");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("say", "Sends a chat message.")];
      }
      default: {
        return [
          new StringOutput("$1", null, true, "message"),
          new SelectorOutput
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new SayCommand
};
