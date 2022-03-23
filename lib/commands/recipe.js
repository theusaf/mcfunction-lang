const CommandBuilder = require("../class/CommandBuilder");

const recipeCommandBuilder = new CommandBuilder("recipe")
  .setDescription("Gives and takes recipes to/from players.")
  .addEnumOption("mode", (opt) => {
    opt.addChoice("give")
      .addChoice("take");
  })
  .addSelectorOption("players")
  .addStringOption("recipe", (opt) => {
    opt.setText("*")
      .setDescription("All recipes")
      .setParallel();
  })
  .addRecipeOption("recipe");

module.exports = {
  "1.12": {
    name: "recipe",
    builder: recipeCommandBuilder
  }
};