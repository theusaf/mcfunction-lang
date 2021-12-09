const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  StringOutput = require("../class/output/StringOutput");

class TeamMessageCommand extends BaseCommand {

  constructor() {super(["tm", "teammsg"]);}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [
          new CommandNameOutput("teammsg", "Send a chat message to the executor's team"),
          new CommandNameOutput("tm", "Send a chat message to the executor's team")
        ];
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
  "1.14": new TeamMessageCommand
};