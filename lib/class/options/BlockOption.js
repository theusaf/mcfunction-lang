/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a block option.
 */
class BlockOption extends BaseOption {

  reformatOutput(lastToken) {
    const { block:blocks } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      blockName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const block of blocks) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || block.startsWith(blockName)) {
          Object.assign(output, {
            text: `minecraft:${block}`
          });
        } else {
          continue;
        }
      } else if (block.startsWith(blockName) || lastToken === "") {
        Object.assign(output, {
          text: block
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = BlockOption;