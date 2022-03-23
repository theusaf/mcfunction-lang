/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a sound option.
 */
class SoundOption extends BaseOption {

  reformatOutput(lastToken) {
    const { sounds } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      soundName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const sound of sounds) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || sound.startsWith(soundName)) {
          Object.assign(output, {
            text: `minecraft:${sound}`
          });
        } else {
          continue;
        }
      } else if (sound.startsWith(soundName) || lastToken === "") {
        Object.assign(output, {
          text: sound
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = SoundOption;