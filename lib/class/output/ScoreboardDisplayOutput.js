const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class ScoreboardDisplayOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {slot} = VersionLoader.ids,
      {scoreboard} = slot,
      output = [],
      tokenValue = lastToken.getValue();
    for (const slot of scoreboard) {
      if (slot.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        if (/[^\w]/.test(tokenValue)) {
          output.push(this.sanitize({
            type: "score_display",
            text: slot,
            displayText: slot,
            description: this.description,
            rightLabel: this.rightLabel
          }, tokenValue));
        } else {
          output.push({
            type: "score_display",
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

module.exports = ScoreboardDisplayOutput;
