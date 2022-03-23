const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a slot option.
 */
class SlotOption extends BaseOption {

  reformatOutput(lastToken) {
    const { slot } = VersionLoader.ids,
      { inventory } = slot,
      result = [];
    for (const slot of inventory) {
      if (slot.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: slot
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = SlotOption;