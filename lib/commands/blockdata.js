const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  NBTOutput = require("../class/output/NBTOutput"),
  NullCommand = require("../class/NullCommand");

/**
 * blockdata <x> <y> <z> <dataTag>
 */
class BlockDataCommand12 extends BaseCommand {
  constructor() {
    super("blockdata");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("blockdata", "Modifies block nbt data.")];
      }
      case 2: {
        return [new CoordinateOutput("x y z", "~", 3)];
      }
      case 3: {
        return [new CoordinateOutput("y z", "~", 2)];
      }
      case 4: {
        return [new CoordinateOutput("z", "~")];
      }
      case 5: {
        return [new NBTOutput("dataTag")];
      }
    }
  }
}

module.exports = {
  "1.12": new BlockDataCommand12,
  "1.13": new NullCommand
};
