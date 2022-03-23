/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a recipe option.
 */
class RecipeOption extends BaseOption {

  reformatOutput(lastToken) {
    const { recipe:recipes } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      recipeName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const recipe of recipes) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || recipe.startsWith(recipeName)) {
          Object.assign(output, {
            text: `minecraft:${recipe}`
          });
        } else {
          continue;
        }
      } else if (recipe.startsWith(recipeName) || lastToken === "") {
        Object.assign(output, {
          text: recipe
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = RecipeOption;