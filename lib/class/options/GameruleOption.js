const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a gamerule option.
 */
class GameruleOption extends BaseOption {

  reformatOutput(lastToken) {
    const { gamerule: gamerules } = VersionLoader.ids,
      result = [];
    for (const gamerule of gamerules) {
      if (gamerule.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: gamerule
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = GameruleOption;