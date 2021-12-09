/* global atom */
const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class ItemOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {item:items} = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0];
    for (const item of items) {
      if (appendNamespace) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "item",
            text: `minecraft:${item}`,
            displayText: `minecraft:${item}`,
            description: this.description,
            rightLabel: this.rightLabel
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          if (item.startsWith(itemName)) {
            output.push(this.sanitize({
              type: "item",
              text: `${item}`,
              displayText: `${item}`,
              description: this.description,
              rightLabel: this.rightLabel
            }, itemName));
          }
          continue;
        }
      }
      if (item.startsWith(itemName)) {
        output.push(this.sanitize({
          type: "item",
          text: item,
          displayText: item,
          description: this.description,
          rightLabel: this.rightLabel
        }, itemName));
      }
    }
    return output;
  }
}

module.exports = ItemOutput;
