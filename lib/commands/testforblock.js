const BaseCommand = require("../class/BaseCommand"),
  NullCommand = require("../class/NullCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  EnumOutput = require("../class/output/EnumOutput");

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
        return [new CoordinateOutput(["x1", "y1", "z1"].slice(tokens.length - 2), "~", 5 - tokens.length, "First corner as the pattern to test for.")];
      }
      case 5:
      case 6:
      case 7: {
        return [new CoordinateOutput(["x2", "y2", "z2"].slice(tokens.length - 5), "~", 8 - tokens.length, "Second corner as the pattern to test for.")];
      }
      case 8:
      case 9:
      case 10: {
        return [new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 8), "~", 11 - tokens.length, "Lower NW corner to check the area created by the previous coordinates.")];
      }
      case 11: {
        return [new EnumOutput(
          ["all", "Mode", "All blocks in the source and destination must match exactly."],
          ["masked", "Mode", "Air blocks in the source will match anything in the destination."]
        )];
      }
    }
  }
}

module.exports = {
  "1.12": new TestforBlockCommand,
  "1.13": new NullCommand
};
