/* global atom */
const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class EffectOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {effect:effects} = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0];
    for (const effect of effects) {
      if (appendNamespace) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "effect",
            text: `minecraft:${effect}`,
            displayText: `minecraft:${effect}`,
            description: this.description,
            rightLabel: this.rightLabel
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          if (effect.startsWith(itemName)) {
            output.push(this.sanitize({
              type: "effect",
              text: `${effect}`,
              displayText: `${effect}`,
              description: this.description,
              rightLabel: this.rightLabel
            }, itemName));
          }
          continue;
        }
      }
      if (effect.startsWith(itemName)) {
        output.push(this.sanitize({
          type: "effect",
          text: effect,
          displayText: effect,
          description: this.description,
          rightLabel: this.rightLabel
        }, itemName));
      }
    }
    return output;
  }
}

module.exports = EffectOutput;
