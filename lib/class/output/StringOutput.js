// display, description, snippet (default text)
const Output = require("../Output");

/**
 * An output for command names
 */
class StringOutput extends Output {

  constructor(display, description, isSnippet, realDisplay) {
    const data = {
      description,
      type: "string",
      displayText: realDisplay ?? display
    };
    if (isSnippet) {
      data.snippet = display;
    } else {
      data.text = display;
    }
    super(data);
  }

  getOutput(lastToken) {
    if (this.snippet) {
      const tokenValue = lastToken.getValue();
      if (tokenValue === "") {
        return this;
      } else {
        delete this.snippet;
        this.text = tokenValue;
        return this.sanitize(this);
      }
    } else {
      if (/[^\w]/.test(this.text)) {
        if (this.text.length === 1) {
          const original = this.text,
            output = this.sanitize(this, lastToken.getValue());
          output.displayText = original;
          if (lastToken.getValue() === "") {
            output.text = original;
          }
          return output;
        }
      }
      return super.getOutput();
    }
  }

}

module.exports = StringOutput;
