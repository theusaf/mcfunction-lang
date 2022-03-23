const BaseOption = require("../BaseOption");

/**
 * Represents a Selector option, such as '@a', including options and player names.
 */
class SelectorOption extends BaseOption {

  reformatOutput(lastToken) {
    const choices = [
      ["a", "Target all players"],
      ["e", "Target all entities"],
      ["p", "Target closest living player"],
      ["r", "Target random player or entity"],
      ["s", "Target executor"]
    ];
    if ((lastToken === "" || lastToken.startsWith("@")) && lastToken.length < 3) {
      const result = [];
      for (const choice of choices) {
        if (lastToken.length === 2 && lastToken[1] !== choice[0]) {continue;}
        const output = super.reformatOutput();
        Object.assign(output, {
          text: "@" + choice[0],
          description: choice[1]
        });
        result.push(output);
      }
      return result;
    } else {
      const output = super.reformatOutput();
      Object.assign(output, {
        snippet: "$1"
      });
      return output;
    }
  }

}

module.exports = SelectorOption;