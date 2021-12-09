const Output = require("../Output");

/**
 * A dynamic output object. Represents entity selectors:
 * @<parse>[thing=foo,etc=etc]
 */
class SelectorOutput extends Output {

  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const tokenValue = lastToken.getValue();
    if (tokenValue[0] === "@" || tokenValue === "") {
      const hasPrefix = tokenValue[0] === "@",
        selectors = ["p","a","r","s","e"];
      if (tokenValue.length < 2) {
        return selectors.map(selector => {
          return {
            text: `${hasPrefix ? "" : "@"}${selector}`,
            type: "selector",
            displayText: `@${selector}`,
            description: this.description,
            rightLabel: this.rightLabel
          };
        });
      }
      // TODO: selector variables
    }
    return this.sanitize({
      type: "selector",
      text: tokenValue,
      displayText: "selector",
      description: this.description,
      rightLabel: this.rightLabel
    });
  }

}

module.exports = SelectorOutput;
