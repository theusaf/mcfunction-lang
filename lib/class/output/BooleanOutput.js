const Output = require("../Output"),
  similarity = require("../../util/similarity");

/**
 * A boolean output
 */
class BooleanOutput extends Output {

  // label, description, default
  constructor(label, description, def="true") {
    super({
      type: "boolean",
      rightLabel: label,
      description,
      text: def
    });
  }

  getOutput(lastToken) {
    const tokenValue = lastToken.getValue(),
      falseCheck = similarity(tokenValue, "false"),
      trueCheck = similarity(tokenValue, "true");
    let text;
    if (tokenValue === "") {
      text = this.text;
      const data = Object.assign({}, super.getOutput()),
        data2 = Object.assign({}, super.getOutput());
      return [
        Object.assign(data, {text}),
        Object.assign(data2, {text: text === "true" ? "false" : "true"})
      ];
    } else {
      text = falseCheck > trueCheck ? "false" : "true";
    }
    this.text = text;
    return super.getOutput();
  }

}

module.exports = BooleanOutput;
