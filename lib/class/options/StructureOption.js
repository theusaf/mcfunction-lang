const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a structure option.
 */
class StructureOption extends BaseOption {

  reformatOutput(lastToken) {
    const { structures } = VersionLoader.ids,
      result = [];
    for (const structure of structures) {
      if (structure.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: structure
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = StructureOption;