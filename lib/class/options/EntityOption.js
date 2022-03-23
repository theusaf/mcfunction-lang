/* global atom */
const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents an entity option.
 */
class EntityOption extends BaseOption {

  reformatOutput(lastToken) {
    const { entity:entities } = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      tokenSplit = lastToken.split(/^minecraft:/),
      entityName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0],
      result = [];
    for (const entity of entities) {
      const output = super.reformatOutput();
      if (appendNamespace && ("minecraft:".startsWith(lastToken) || lastToken.startsWith("minecraft:"))) {
        if ("minecraft:".startsWith(lastToken) || entity.startsWith(entityName)) {
          Object.assign(output, {
            text: `minecraft:${entity}`
          });
        } else {
          continue;
        }
      } else if (entity.startsWith(entityName) || lastToken === "") {
        Object.assign(output, {
          text: entity
        });
      } else {
        continue;
      }
      result.push(output);
    }
    return result;
  }

}

module.exports = EntityOption;