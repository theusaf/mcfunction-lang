/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a biome option.
 */
class BiomeOption extends BaseOption {

  #includeTags = false;

  /**
   * Includes biome tags in the output.
   */
  includeTags() {
    this.#includeTags = true;
  }

  reformatOutput(lastToken) {
    const { biomes } = VersionLoader.ids,
      result = [];
    for (const biome of biomes) {
      if (biome.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: biome
        });
        result.push(output);
      }
    }
    if (this.#includeTags) {
      const { biomes } = VersionLoader.ids.tag,
        tokenSplit = lastToken.split(/^#minecraft:/),
        tagName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
        appendNamespace = atom.config.get("mcfunction-lang.showNamespace");
      for (const biomeTag of biomes) {
        const output = super.reformatOutput();
        if (appendNamespace && ("#minecraft:".startsWith(lastToken) || lastToken.startsWith("#minecraft:"))) {
          if ("#minecraft:".startsWith(lastToken) || biomeTag.startsWith(tagName)) {
            Object.assign(output, {
              text: `#minecraft:${biomeTag}`
            });
          } else {
            continue;
          }
        } else if (biomeTag.startsWith(tagName.substring(1)) || lastToken === "") {
          Object.assign(output, {
            text: `#${biomeTag}`
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

module.exports = BiomeOption;