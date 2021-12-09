const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  NBTOutput = require("../class/output/NBTOutput"),
  ItemOutput = require("../class/output/ItemOutput");

class GiveCommand12 extends BaseCommand {
  constructor() {
    super("give");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("give", "give items to players.")];
      }
      case 2: {
        return [new SelectorOutput(null, "players")];
      }
      case 3: {
        return [new ItemOutput(null, "item")];
      }
      case 4: {
        return [(new NumberOutput("count", "The number of items to give.", "64")).optional()];
      }
      case 5: {
        return [(new NumberOutput("data", "The damage/data value of the item.", "0")).optional()];
      }
      case 6: {
        return [(new NBTOutput("dataTag", "The NBT data for the item.")).optional()];
      }
    }
  }
}

class GiveCommand13 extends GiveCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length > 4) {
      return;
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new GiveCommand12,
  "1.13": new GiveCommand13
};
