const BaseOption = require("../BaseOption");

class NumberOption extends BaseOption {

  /**
   * The type of number option this is
   * 
   * @type {String} One of 'int', 'float'
   * @default "float"
   */
  type = "float";

  /**
   * The maximum value this option can be
   * 
   * @type {Number}
   */
  max = Number.MAX_VALUE;

  /**
   * The minimum value this option can be
   * 
   * @type {Number}
   */
  min = Number.MIN_VALUE;

  /**
   * Constructs a Number option.
   * 
   * @param {String} label The label of this option.
   */
  constructor(label) {
    super(label);
    this.setDefaultValue("0");
  }

  /**
   * Sets the type of this number option.
   * 
   * @param {String} type The number type. Valid options are: 'int', 'float'
   * @throws {TypeError} Thrown when an invalid type is provided.
   */
  setType(type) {
    if (type !== "float" && type !== "int") {
      throw new TypeError(`Number type '${type}' is invalid. Valid options are 'int' and 'float'.`);
    }
    this.type = type;
    return this;
  }

  tokenIsApplicable(token) {
    if (this.type === "int") {
      return /^-?\d+$/.test(token);
    } else {
      return /^-?(\d*\.)?\d+$/.test(token);
    }
  }

  isValid(token) {
    const value = parseFloat(token);
    if (isNaN(value)) {
      return 0;
    }
    if (this.type === "int") {
      if (/\./.test(token)) {
        return 0;
      }
    }
    if (value > this.max || value < this.min) {
      return 0;
    } 
    return super.isValid(...arguments);
  }

}

module.exports = NumberOption;