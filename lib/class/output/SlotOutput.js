const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

// TODO: split block and entity slots

class SlotOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {slot} = VersionLoader.ids,
      {inventory} = slot,
      output = [],
      tokenValue = lastToken.getValue();
    for (const slot of inventory) {
      if (slot.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        output.push({
          type: "slot",
          text: slot,
          displayText: slot,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = SlotOutput;
