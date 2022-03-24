/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a structure option.
 */
class StructureOption extends BaseOption {

  #includeTags = false;

  /**
   * Includes structure tags in the output.
   */
  includeTags() {
    this.#includeTags = true;
  }

  reformatOutput(lastToken) {
    const { structures } = VersionLoader.ids,
      result = [];
    for (const structure of structures) {
      if (structure.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: structure
        });
        result.push(output);
      }
    }
    if (this.#includeTags) {
      const { configuredStructures } = VersionLoader.ids.tag,
        tokenSplit = lastToken.split(/^#minecraft:/),
        tagName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
        appendNamespace = atom.config.get("mcfunction-lang.showNamespace");
      for (const structureTag of configuredStructures) {
        const output = super.reformatOutput();
        if (appendNamespace && ("#minecraft:".startsWith(lastToken) || lastToken.startsWith("#minecraft:"))) {
          if ("#minecraft:".startsWith(lastToken) || structureTag.startsWith(tagName)) {
            Object.assign(output, {
              text: `#minecraft:${structureTag}`
            });
          } else {
            continue;
          }
        } else if (structureTag.startsWith(tagName.substring(1)) || lastToken === "") {
          Object.assign(output, {
            text: `#${structureTag}`
          });
        } else {
          continue;
        }
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = StructureOption;