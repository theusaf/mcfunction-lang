const Output = require("../Output");

/**
 * An output for numbers
 */
class NumberOutput extends Output {

  /**
   * displayed text, description, default=0
   */
  constructor(display, description, def="0") {
    super({
      text: def,
      displayText: display,
      description,
      type: "number"
    });
  }

}

module.exports = NumberOutput;
