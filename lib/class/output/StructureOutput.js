const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class StructureOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {structures} = VersionLoader.ids,
      output = [],
      tokenValue = lastToken.getValue();
    for (const structure of structures) {
      if (structure.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        output.push({
          type: "structure",
          text: structure,
          displayText: structure,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = StructureOutput;
