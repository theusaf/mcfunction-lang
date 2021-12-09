/* global atom */
const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class SoundOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {sounds} = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0];
    for (const sound of sounds) {
      if (appendNamespace) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "sound",
            text: `minecraft:${sound}`,
            displayText: `minecraft:${sound}`,
            description: this.description,
            rightLabel: this.rightLabel
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          if (sound.startsWith(itemName)) {
            output.push(this.sanitize({
              type: "sound",
              text: `${sound}`,
              displayText: `${sound}`,
              description: this.description,
              rightLabel: this.rightLabel
            }, itemName));
          }
          continue;
        }
      }
      if (sound.startsWith(itemName)) {
        output.push(this.sanitize({
          type: "sound",
          text: sound,
          displayText: sound,
          description: this.description,
          rightLabel: this.rightLabel
        }, itemName));
      }
    }
    return output;
  }
}

module.exports = SoundOutput;
