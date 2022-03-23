const BaseOption = require("../BaseOption");

/**
 * Represents a coordinate option.
 * 
 * @param {String} label The label for this option
 * @param {Number} amount The number to repeat the output by
 */
class CoordinateOption extends BaseOption {

  /**
   * The number to repeat the output by
   * 
   * @type {Number}
   */
  repeats = 1;

  /**
   * The string to repeat
   * 
   * @type {String}
   */
  defaultString = "~";

  constructor(label, amount) {
    super(label);
    this.repeats = amount;
  }

  tokenIsApplicable(token) {
    return this.isValid(token);
  }

  isValid(token) {
    return /^([~^](-?(\d*\.)?\d+)?)|(-?(\d*\.)?\d+)$/.test(token);
  }

  setDefaultValue(value) {
    this.defaultString = value;
    return this;
  }

  reformatOutput(token) {
    const output = super.reformatOutput(token);
    if (token === "") {
      const str = ` ${this.defaultString}`.repeat(this.repeats).trim();
      Object.assign(output, {
        text: str
      });
    } else {
      Object.assign(output, {
        text: /^\w+$/.test(token) ? token : " "
      });
    }
    return output;
  }

}

module.exports = CoordinateOption;