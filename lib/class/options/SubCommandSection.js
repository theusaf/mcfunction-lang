/* eslint-disable no-unused-vars */
const BaseOption = require("../BaseOption"),
  Section = require("./Section");

class SubCommandSection extends Section {

  /**
   * Constructs a SubCommandSection.
   * 
   * @param {String} name The name of the sub command
   * @param {String} label The label of the sub command
   * @throws {TypeError} Thrown when an invalid name is provided
   */
  constructor(name, label = "") {
    if (typeof name !== "string") {
      throw new TypeError("The name provided to the sub command is invalid.");
    }
    super(label);
    this.setDisplayText(name);
    this.setText(name);
    this.setParallel();
  }

  isValid(token) {
    return token === this.text ? 1 : 0;
  }

  tokenIsApplicable(token) {
    return token === this.text;
  }

  reformatOutput(token) {
    if (this.text.startsWith(token)) {
      return super.reformatOutput();
    } else {
      return [];
    }
  }

  /**
   * Builds the command, returns a generator
   * 
   * @generator
   * @yields {BaseOption[]}
   * @returns {Generator<BaseOption[], BaseOption[], BaseOption[]>}
   */
  *build() {
    yield [this];
    yield* super.build();
  }

}

module.exports = SubCommandSection;