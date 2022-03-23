/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents an item option.
 */
class ItemOption extends BaseOption {

  reformatOutput(lastToken) {
    const { item:items } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      itemName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const item of items) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || item.startsWith(itemName)) {
          Object.assign(output, {
            text: `minecraft:${item}`
          });
        } else {
          continue;
        }
      } else if (item.startsWith(itemName) || lastToken === "") {
        Object.assign(output, {
          text: item
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = ItemOption;