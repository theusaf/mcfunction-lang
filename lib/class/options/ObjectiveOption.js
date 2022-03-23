const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents an objective option.
 */
class ObjectiveOption extends BaseOption {

  reformatOutput(lastToken) {
    const { slot } = VersionLoader.ids,
      { objective:objectives } = slot,
      result = [];
    for (const objective of objectives) {
      if (objective.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: objective
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = ObjectiveOption;