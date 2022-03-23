/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents an enchantment option.
 */
class EnchantmentOption extends BaseOption {

  reformatOutput(lastToken) {
    const { enchantment:enchantments } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      enchantmentName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const enchantment of enchantments) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || enchantment.startsWith(enchantmentName)) {
          Object.assign(output, {
            text: `minecraft:${enchantment}`
          });
        } else {
          continue;
        }
      } else if (enchantment.startsWith(enchantmentName) || lastToken === "") {
        Object.assign(output, {
          text: enchantment
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = EnchantmentOption;