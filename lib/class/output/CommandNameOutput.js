const Output = require("../Output");

/**
 * An output for command names
 */
class CommandNameOutput extends Output {

  constructor(name, description) {
    super({
      text: name,
      type: "command",
      description
    });
  }

  getOutput(lastToken) {
    if (/[^\w]/.test(this.text)) {
      if (this.text.length === 1) {
        const original = this.text,
          output = this.sanitize(this, lastToken.getValue());
        output.displayText = original;
        return output;
      }
      return this.sanitize(this, lastToken.getValue());
    } else {
      return super.getOutput();
    }
  }

}

module.exports = CommandNameOutput;
