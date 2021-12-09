const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  StringOutput = require("../class/output/StringOutput"),
  NBTOutput = require("../class/output/NBTOutput"),
  BlockOutput = require("../class/output/BlockOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class SetblockCommand12 extends BaseCommand {
  constructor() {
    super("setblock");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("setblock", "Sets a block at a location.")];
      }
      case 2:
      case 3:
      case 4: {
        return [new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 2).join(" "), "~", 5 - tokens.length, "Block coordinate to set.")];
      }
      case 5: {
        return [new BlockOutput(null, "block")];
      }
      case 6: {
        return [
          (new NumberOutput("dataValue", "The data/damage number of the block.", "0")).optional(),
          (new StringOutput("${1:state}", "The block state to use.", true, "state")).optional()
        ];
      }
      case 7: {
        return [(new EnumOutput(
          ["destroy", "oldBlockHandling", "Destroys the block before setting it."],
          ["keep", "oldBlockHandling", "Only air blocks will be changed."],
          ["replace", "oldBlockHandling", "Default mode, just replaces the block."]
        )).optional()];
      }
      case 8: {
        return [(new NBTOutput("dataTag", "The NBT data of the block.")).optional()];
      }
    }
  }
}

class SetblockCommand13 extends SetblockCommand12 {
  
  handleSuggestions(tokens) {
    if (tokens.length > 5) {
      tokens.push(null);
    }
    if (tokens.length === 8) {
      return;
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new SetblockCommand12,
  "1.13": new SetblockCommand13
};
