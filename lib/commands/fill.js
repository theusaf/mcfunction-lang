const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  BlockOutput = require("../class/output/BlockOutput"),
  NBTOutput = require("../class/output/NBTOutput");

class FillCommand12 extends BaseCommand {
  constructor() {
    super("fill");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("fill", "Fill an area with blocks.")];
      }
      case 2:
      case 3:
      case 4: {
        return [new CoordinateOutput(["x1", "y1", "z1"].slice(tokens.length - 2).join(" "), "~", 5 - tokens.length, "First corner to fill.")];
      }
      case 5:
      case 6:
      case 7: {
        return [new CoordinateOutput(["x2", "y2", "z2"].slice(tokens.length - 5).join(" "), "~", 8 - tokens.length, "Second corner to fill.")];
      }
      case 8: {
        return [new BlockOutput(null, "block")];
      }
      case 9: {
        return [(new StringOutput("${1:state}", "The block state to set for the filled blocks.", true, "state")).optional()];
      }
      case 10: {
        return [
          (new EnumOutput(
            ["destroy", "oldBlockHandling", "Destroy all blocks in filled area before filling"],
            ["hollow", "oldBlockHandling", "Only replace blocks on the outer edges of the fill region. Inner areas are replaced with air."],
            ["keep", "oldBlockHandling", "Replaces only air with the specified block."],
            ["outline", "oldBlockHandling", "Only replaces blocks on the outder edges of the fill region. Inner areas are not affected."],
            ["replace", "oldBlockHandling", "The default behavior. Replaces all blocks in the region with the specified block."]
          )).optional()
        ];
      }
      case 11: {
        return [(new NBTOutput("dataTag", "The NBT data to be applied to the filled blocks.")).optional()];
      }
    }
  }
}

class FillCommand13 extends FillCommand12 {

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 9: {
        return [
          (new EnumOutput(
            ["destroy", "Fill Mode", "Destroy all blocks in filled area before filling"],
            ["hollow", "Fill Mode", "Only replace blocks on the outer edges of the fill region. Inner areas are replaced with air."],
            ["keep", "Fill Mode", "Replaces only air with the specified block."],
            ["outline", "Fill Mode", "Only replaces blocks on the outder edges of the fill region. Inner areas are not affected."],
            ["replace", "Fill Mode", "The default behavior. Replaces all blocks in the region with the specified block."]
          )).optional()
        ];
      }
      case 10: {
        if (tokens[8].getValue() === "replace") {
          return [(new BlockOutput("The block filter to replace", "filter")).optional()];
        }
        break;
      }
      case 11: {
        return;
      }
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new FillCommand12,
  "1.13": new FillCommand13
};
