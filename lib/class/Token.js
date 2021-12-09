/**
 * A string. Contains extra information.
 */
class Token {

  /**
   * constructor - Creates a token
   *
   * @param  {String} string the word
   */
  constructor(string) {
    this.setValue(string);
  }

  /**
   * setValue - Sets the value of the token
   *
   * @param  {String} string the word
   */
  setValue(string) {
    this.value = string;
    this.split = this._parse();
  }

  /**
   * getValue - Gets the full string value
   *
   * @return {String}  the full string value
   */
  getValue() {
    return this.value;
  }

  /**
   * getTokens - Returns the tokens
   *
   * @return {String[]}  The tokens
   */
  getTokens() {
    return this.split;
  }

  /**
   * getCurrentToken - Gets the last word (\w) value
   *
   * @return {String} the last word value
   */
  getCurrentToken() {
    return this.split[this.split.length - 1];
  }

  _parse() {
    return this.value.split(/[^\w]/g);
  }

  toString() {
    return this.value;
  }

}

module.exports = Token;
