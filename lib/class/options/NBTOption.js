const BaseOption = require("../BaseOption");

class NBTOption extends BaseOption {

  /**
   * Constructs an NBT option.
   * 
   * @param {String} label The label for this option
   */
  constructor(label) {
    super(label);
    this.setSnippet("${1:{}\\}");
  }

  reformatOutput(lastToken) {
    const output = super.reformatOutput();
    if (lastToken !== "") {
      Object.assign(output, {
        snippet: "$1"
      });
    }
    return output;
  }

}

module.exports = NBTOption;