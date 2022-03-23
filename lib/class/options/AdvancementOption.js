/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents an advancement option.
 */
class AdvancementOption extends BaseOption {

  reformatOutput(lastToken) {
    const { advancement:advancements } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      advancementName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const advancement of advancements) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || advancement.startsWith(advancementName)) {
          Object.assign(output, {
            text: `minecraft:${advancement}`
          });
        } else {
          continue;
        }
      } else if (advancement.startsWith(advancementName) || lastToken === "") {
        Object.assign(output, {
          text: advancement
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = AdvancementOption;