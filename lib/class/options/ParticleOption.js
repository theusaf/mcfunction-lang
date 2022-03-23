const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a particle option.
 */
class ParticleOption extends BaseOption {

  reformatOutput(lastToken) {
    const { particle: particles } = VersionLoader.ids,
      result = [];
    for (const particle of particles) {
      if (particle.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: particle
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = ParticleOption;