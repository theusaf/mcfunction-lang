const Output = require("../Output");

/**
 * An output for commands
 */
class CoordinateOutput extends Output {

  /**
   * label, default char, num to show, description
   */
  constructor(label, character, repeats, description) {
    repeats = repeats ?? 1;
    const text = `${character} `.repeat(repeats);
    super({
      text: text.slice(0, text.length - 1),
      displayText: label,
      type: "coordinate",
      description
    });
    this.repeats = repeats;
    this.character = character;
  }

  getOutput(lastToken) {
    const value = lastToken.getValue();
    if (value !== "") {
      const keep = value.match(/\w*$/)[0] ?? "";
      this.text = keep + ` ${this.character}`.repeat(this.repeats - 1);
    }
    return this;
  }

}

module.exports = CoordinateOutput;
