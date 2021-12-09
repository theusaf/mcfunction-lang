const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class GameruleOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {gamerule:gamerules} = VersionLoader.ids,
      output = [],
      tokenValue = lastToken.getValue();
    for (const gamerule of gamerules) {
      if (gamerule.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        output.push({
          type: "gamerule",
          text: gamerule,
          displayText: gamerule,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = GameruleOutput;
