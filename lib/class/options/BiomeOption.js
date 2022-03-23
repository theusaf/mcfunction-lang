const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a biome option.
 */
class BiomeOption extends BaseOption {

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
    return result;
  }

}

module.exports = BiomeOption;