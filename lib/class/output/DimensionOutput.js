/* global atom */
const Output = require("../Output");

class DimensionOutput extends Output {
  constructor() {super({});}

  getOutput(lastToken) {
    const namespaces = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      DIMENSIONS = ["overworld", "the_end", "the_nether"];
    for (const dimension of DIMENSIONS) {
      if (namespaces) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "dimension",
            text: `minecraft:${dimension}`,
            displayText: `minecraft:${dimension}`
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          output.push(this.sanitize({
            type: "dimension",
            text: `${dimension}`,
            displayText: `${dimension}`
          }, itemName));
          continue;
        }
      }
      if (dimension.startsWith(itemName)) {
        output.push(this.sanitize({
          type: "dimension",
          text: dimension,
          displayText: dimension
        }, itemName));
      }
    }
    return output;
  }
}

module.exports = DimensionOutput;