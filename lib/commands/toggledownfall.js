const BaseCommand = require("../class/BaseCommand"),
  NullCommand = require("../class/NullCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput");

class ToggleDownfallCommand extends BaseCommand {
  constructor() {super("toggledownfall");}

  handleSuggestions(tokens) {
    if (tokens.length === 1) {
      return [new CommandNameOutput("toggledownfall", "Toggles the weather between clear and raining.")];
    }
  }
}

module.exports = {
  "1.12": new ToggleDownfallCommand,
  "1.13": new NullCommand
};