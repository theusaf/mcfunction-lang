/* eslint-disable no-unused-vars */
const Section = require("./options/Section"),
  BaseOption = require("./BaseOption");

/**
 * Represents a builder to build commands.
 */
class CommandBuilder extends Section {

  /**
   * The names of the command
   * 
   * @type {String[]}
   */
  #names;

  /**
   * Constructs a CommandBuilder.
   * 
   * @param {String} name The name of the command 
   */
  constructor(name) {
    super();
    this.#names = [name];
  }

  /**
   * Adds an alias command name to the command.
   * 
   * @param {String} alias The additional name of the command
   */
  addAlias(alias) {
    this.#names.push(alias);
    return this;
  }

  /**
   * Builds the command, returns a generator
   * 
   * @generator
   * @yields {BaseOption[]}
   * @returns {Generator<BaseOption[], any, BaseOption[]>}
   */
  *build() {
    yield [this];
    yield* super.build();
  }

  reformatOutput(lastToken) {
    if (this.#names.length === 1) {
      if (this.#names[0].startsWith(lastToken)) {
        return this._refOutput(this.#names[0]);
      } else {
        return [];
      }
    } else {
      const output = [];
      for (const name of this.#names) {
        if (name.startsWith(lastToken)) {
          output.push(this._refOutput(name));
        }
      }
      return output;
    }
  }

  _refOutput(name) {
    const output = super.reformatOutput();
    Object.assign(output, {
      text: name,
      description: this.description
    });
    return output;
  }

}

module.exports = CommandBuilder;