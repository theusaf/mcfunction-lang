/* global atom */
const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class BlockOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {block:blocks} = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0];
    for (const block of blocks) {
      if (appendNamespace) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "block",
            text: `minecraft:${block}`,
            displayText: `minecraft:${block}`,
            description: this.description,
            rightLabel: this.rightLabel
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          if (block.startsWith(itemName)) {
            output.push(this.sanitize({
              type: "block",
              text: `${block}`,
              displayText: `${block}`,
              description: this.description,
              rightLabel: this.rightLabel
            }, itemName));
          }
          continue;
        }
      }
      if (block.startsWith(itemName)) {
        output.push(this.sanitize({
          type: "block",
          text: block,
          displayText: block,
          description: this.description,
          rightLabel: this.rightLabel
        }, itemName));
      }
    }
    return output;
  }
}

module.exports = BlockOutput;
