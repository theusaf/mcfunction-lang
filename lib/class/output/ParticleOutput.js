const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class ParticleOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {particle:particles} = VersionLoader.ids,
      output = [],
      tokenValue = lastToken.getValue();
    for (const particle of particles) {
      if (particle.startsWith(tokenValue)) {
        output.push({
          type: "particle",
          text: particle,
          displayText: particle,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = ParticleOutput;
