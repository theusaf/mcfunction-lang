const BaseOption = require("../BaseOption");

class StringOption extends BaseOption {

  /**
   * The text of this string option
   * Non-modifyable
   * 
   * @type {String}
   */
  text;

  /**
   * Sets this string option's snippet.
   * 
   * @param {String} snippet The snippet text to set the snippet to
   */
  setSnippet(snippet) {
    this.text = null;
    this.snippet = snippet;
    return this;
  }

  /**
   * Sets this string option's text/value.
   * 
   * @param {String} text The text to use
   */
  setValue(text) {
    this.text = text;
    this.snippet = null;
    return this;
  }

  isValid(mytoken) {
    if (this.text) {
      return this.text === mytoken ? 1 : 0;
    }
    return super.isValid(...arguments);
  }

  reformatOutput(token) {
    const output = super.reformatOutput();
    if (this.text && !this.snippet) {
      if (!this.text.startsWith(token)) {
        return [];
      }
    }
    Object.assign(output, {
      text: this.text
    });
    return output;
  }

}

module.exports = StringOption;