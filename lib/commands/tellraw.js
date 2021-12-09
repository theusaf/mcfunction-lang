const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class TellRawCommand extends BaseCommand {
  constructor() {super("tellraw");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("tellraw", "Sends JSON messages to players.")];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
      }
      case 3: {
        return [new StringOutput(
          "${1:{\"text\":\"example\"}}",
          "The raw JSON message.",
          true,
          "message"
        )];
      }
    }
  }
}

module.exports = {
  "1.12": new TellRawCommand
};
