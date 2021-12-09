const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  EntityOutput = require("../class/output/EntityOutput"),
  NBTOutput = require("../class/output/NBTOutput");

class SummonCommand extends BaseCommand {
  constructor() {super("summon");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("summon", "Summons an entity.")];
      }
      case 2: {
        return [new EntityOutput(null, "entity")];
      }
      case 3:
      case 4:
      case 5: {
        return [new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 3).join(" "), "~", 6 - tokens.length, "The position to summon the entity at.")];
      }
      case 6: {
        return [new NBTOutput("nbt", "NBT data to be applied to the entity.")];
      }
    }
  }
}

module.exports = {
  "1.12": new SummonCommand
};
