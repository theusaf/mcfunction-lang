const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a scorebaord display option.
 */
class ScoreboardDisplayOption extends BaseOption {

  reformatOutput(lastToken) {
    const { slot } = VersionLoader.ids,
      { scoreboard } = slot,
      result = [];
    for (const display of scoreboard) {
      if (display.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: display
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = ScoreboardDisplayOption;