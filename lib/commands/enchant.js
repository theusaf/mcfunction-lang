const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  EnchantmentOutput = require("../class/output/EnchantmentOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class EnchantCommand extends BaseCommand {
  constructor() {
    super("enchant");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("enchant", "Enchants items held in player's hands")];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
      }
      case 3: {
        return [new EnchantmentOutput(null, "enchantment")];
      }
      case 4: {
        return [(new NumberOutput("level", "The level of the enchantment. The command may not work if the level is above the max level.", "1")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new EnchantCommand
};
