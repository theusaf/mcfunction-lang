const BaseOption = require("../BaseOption"),
  BOOLEANS = [
    "true",
    "false"
  ];

/**
 * Represents a boolean option.
 */
class BooleanOption extends BaseOption {

  tokenIsApplicable(token) {
    return BOOLEANS.includes(token);
  }

  reformatOutput(lastToken) {
    const result = [];
    for (const boolean of BOOLEANS) {
      if (boolean.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: boolean
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = BooleanOption;