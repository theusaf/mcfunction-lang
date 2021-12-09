const BaseCommand = require("../class/BaseCommand"),
  NullCommand = require("../class/NullCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class TestforCommand extends BaseCommand {
  constructor() {super("testfor");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("testfor", "Tests for entities.")];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
      }
    }
  }
}

module.exports = {
  "1.12": new TestforCommand,
  "1.13": new NullCommand
};
