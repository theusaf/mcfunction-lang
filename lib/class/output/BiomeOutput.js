const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class BiomeOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {biomes} = VersionLoader.ids,
      output = [],
      tokenValue = lastToken.getValue();
    for (const biome of biomes) {
      if (biome.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        output.push({
          type: "biome",
          text: biome,
          displayText: biome,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = BiomeOutput;
