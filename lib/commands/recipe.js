const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  RecipeOutput = require("../class/output/RecipeOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class RecipeCommand extends BaseCommand {
  constructor() {
    super("recipe");
  }

  handleSuggestions(tokens) {
    if (tokens.length > 2 && !["give", "take"].includes(tokens[1].getValue())) {
      return;
    }
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("recipe", "Gives and takes recipes to/from players.")];
      }
      case 2: {
        return [new EnumOutput(
          ["give", "Mode"],
          ["take", "Mode"]
        )];
      }
      case 3: {
        return [new SelectorOutput(null, "players")];
      }
      case 4: {
        return [
          new StringOutput("*", "All recipes."),
          new RecipeOutput(null, "recipe")
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new RecipeCommand
};
