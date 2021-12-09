const BaseCommand = require("../class/BaseCommand"),
  NullCommand = require("../class/NullCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  BlockOutput = require("../class/output/BlockOutput"),
  NumberOutput = require("../class/output/NumberOutput");

class TestforBlockCommand extends BaseCommand {
  constructor() {super("testforblock");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("testforblock", "Tests for blocks.")];
      }
      case 2:
      case 3:
      case 4: {
        return [new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 2), "~", 5 - tokens.length)];
      }
      case 5: {
        return [new BlockOutput(null, "block")];
      }
      case 6: {
        return [(new NumberOutput("dataValue", "The damage value for the tested block.", "0")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new TestforBlockCommand,
  "1.13": new NullCommand
};
