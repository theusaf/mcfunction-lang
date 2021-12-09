const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  ItemOutput = require("../class/output/ItemOutput"),
  NBTOutput = require("../class/output/NBTOutput"),
  NumberOutput = require("../class/output/NumberOutput");

/**
 * clear <target> [item] [data] [max] [dataTag]
 */
class ClearCommand12 extends BaseCommand {
  constructor() {
    super("clear");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("clear", "Clears items from a player's inventory.")];
      }
      case 2: {
        return [(new SelectorOutput(null, "targets")).optional()];
      }
      case 3: {
        return [(new ItemOutput("The item id to clear", "item")).optional()];
      }
      case 4: {
        return [(new NumberOutput("data", "item data/damage number")).optional()];
      }
      case 5: {
        return [(new NumberOutput("max", "max number of items to remove", "1")).optional()];
      }
      case 6: {
        return [(new NBTOutput("dataTag", "NBT Data to match item")).optional()];
      }
    }
  }
}

class ClearCommand13 extends ClearCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length === 6) {
      return;
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new ClearCommand12,
  "1.13": new ClearCommand13
};
