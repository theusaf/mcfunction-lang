/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents an effect option.
 */
class EffectOption extends BaseOption {

  reformatOutput(lastToken) {
    const { effect:effects } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      effectName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const effect of effects) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || effect.startsWith(effectName)) {
          Object.assign(output, {
            text: `minecraft:${effect}`
          });
        } else {
          continue;
        }
      } else if (effect.startsWith(effectName) || lastToken === "") {
        Object.assign(output, {
          text: effect
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = EffectOption;