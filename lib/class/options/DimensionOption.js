/* global atom */
const BaseOption = require("../BaseOption");

/**
 * Represents a dimension option.
 */
class DimensionOption extends BaseOption {

  reformatOutput(lastToken) {
    const DIMENSIONS = ["overworld", "the_end", "the_nether"],
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      dimensionName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const dimension of DIMENSIONS) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || dimension.startsWith(dimensionName)) {
          Object.assign(output, {
            text: `minecraft:${dimension}`
          });
        } else {
          continue;
        }
      } else if (dimension.startsWith(dimensionName) || lastToken === "") {
        Object.assign(output, {
          text: dimension
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = DimensionOption;