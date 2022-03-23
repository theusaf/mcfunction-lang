/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a feature option.
 */
class FeatureOption extends BaseOption {

  reformatOutput(lastToken) {
    const { feature:features } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      blockName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const feature of features) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || feature.startsWith(blockName)) {
          Object.assign(output, {
            text: `minecraft:${feature}`
          });
        } else {
          continue;
        }
      } else if (feature.startsWith(blockName) || lastToken === "") {
        Object.assign(output, {
          text: feature
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = FeatureOption;