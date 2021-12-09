const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class ObjectiveOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {slot} = VersionLoader.ids,
      {objective} = slot,
      output = [],
      tokenValue = lastToken.getValue();
    for (const slot of objective) {
      if (slot.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        if (/[^\w]/.test(tokenValue)) {
          output.push(this.sanitize({
            type: "objective",
            text: slot,
            displayText: slot,
            description: this.description,
            rightLabel: this.rightLabel
          }, tokenValue));
        } else {
          output.push({
            type: "objective",
            text: slot,
            displayText: slot,
            description: this.description,
            rightLabel: this.rightLabel
          });
        }
      }
    }
    return output;
  }
}

module.exports = ObjectiveOutput;
