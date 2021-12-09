const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  BlockOutput = require("../class/output/BlockOutput"),
  StringOutput = require("../class/output/StringOutput"),
  NumberOutput = require("../class/output/NumberOutput");

/**
 * clone <x> <y> <z> <x> <y> <z> <x> <y> <z> [maskMode] [cloneMode]
 */
class CloneCommand12 extends BaseCommand {
  constructor() {
    super("clone");
  }

  handleSuggestions(tokens) {
    if (
      (tokens.length > 11 && !["replace", "masked", "filtered"].includes(tokens[10].getValue())) ||
      (tokens.length > 12 && !["force", "normal", "move"].includes(tokens[11].getValue()))
    ) {
      return;
    }
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("clone", "Clones blocks from one location to another.")];
      }
      case 2:
      case 3:
      case 4: {
        return [new CoordinateOutput(["x1", "y1", "z1"].slice(tokens.length - 2).join(" "), "~", 5 - tokens.length, "First corner to start cloning from")];
      }
      case 5:
      case 6:
      case 7: {
        return [new CoordinateOutput(["x2", "y2", "z2"].slice(tokens.length - 5).join(" "), "~", 8 - tokens.length, "Second corner to start cloning from")];
      }
      case 8:
      case 9:
      case 10: {
        return [new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 8).join(" "), "~", 11 - tokens.length, "Location to place the cloned structure at. Places starting at the bottom, northwest corner.")];
      }
      case 11: {
        return [
          new EnumOutput(
            ["replace", "MaskMode", "Replace all blocks with cloned blocks"],
            ["masked", "MaskMode", "Copy all non-air blocks to the location"],
            ["filtered", "MaskMode", "Copy all blocks with the specified id and data"]
          )
        ];
      }
      case 12: {
        return [
          new EnumOutput(
            ["force", "CloneMode", "Force the clone even if source and destination overlap"],
            ["normal", "CloneMode", "Clone the source and then remove the source with air"],
            ["move", "CloneMode", "Clone the source, prevent cloning if source and destination overlap"]
          )
        ];
      }
      case 13: {
        return [
          new BlockOutput("the block id to clone from the source", "Clone filter")
        ];
      }
      case 14: {
        return [
          new NumberOutput("Block data", "The block damage number to filter the blocks cloned"),
          new StringOutput("Block state", "The block state to filter the blocks cloned")
        ];
      }
    }
  }
}

class CloneCommand13 extends CloneCommand12 {

  handleSuggestions(tokens) {
    const subCommand = tokens[10]?.getValue();
    switch (tokens.length) {
      case 12: {
        if (subCommand === "filtered") {
          return [
            new BlockOutput("the block id to clone from the source", "Clone filter")
          ];
        } else if (["replace", "masked"].includes(subCommand)) {
          return super.handleSuggestions(tokens);
        } else {
          return;
        }
      }
      case 13: {
        if (subCommand === "filtered") {
          return [
            new EnumOutput(
              ["force", "CloneMode", "Force the clone even if source and destination overlap"],
              ["normal", "CloneMode", "Clone the source and then remove the source with air"],
              ["move", "CloneMode", "Clone the source, prevent cloning if source and destination overlap"]
            )
          ];
        } else {
          return;
        }
      }
      case 14: {
        return;
      }
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new CloneCommand12,
  "1.13": new CloneCommand13
};
