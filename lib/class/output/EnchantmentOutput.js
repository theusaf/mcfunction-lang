/* global atom */
const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class EnchantmentOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {enchantment:enchantments} = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0];
    for (const enchantment of enchantments) {
      if (appendNamespace) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "enchantment",
            text: `minecraft:${enchantment}`,
            displayText: `minecraft:${enchantment}`,
            description: this.description,
            rightLabel: this.rightLabel
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          if (enchantment.startsWith(itemName)) {
            output.push(this.sanitize({
              type: "enchantment",
              text: `${enchantment}`,
              displayText: `${enchantment}`,
              description: this.description,
              rightLabel: this.rightLabel
            }, itemName));
          }
          continue;
        }
      }
      if (enchantment.startsWith(itemName)) {
        output.push(this.sanitize({
          type: "enchantment",
          text: enchantment,
          displayText: enchantment,
          description: this.description,
          rightLabel: this.rightLabel
        }, itemName));
      }
    }
    return output;
  }
}

module.exports = EnchantmentOutput;
