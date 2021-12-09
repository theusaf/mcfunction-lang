/* global atom */
const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class EntityOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {entity:entities} = VersionLoader.ids,
      appendNamespace = atom.config.get("mcfunction-lang.showNamespace"),
      output = [],
      tokenValue = lastToken.getValue(),
      tokenSplit = tokenValue.split(/^minecraft:/),
      entityName = tokenSplit[0] === "" ? tokenSplit[1] : tokenSplit[0];
    for (const entity of entities) {
      if (appendNamespace) {
        if ("minecraft".startsWith(tokenValue)) {
          output.push({
            type: "entity",
            text: `minecraft:${entity}`,
            displayText: `minecraft:${entity}`,
            description: this.description,
            rightLabel: this.rightLabel
          });
          continue;
        } else if (tokenValue.startsWith("minecraft:")) {
          if (entity.startsWith(entityName)) {
            output.push(this.sanitize({
              type: "entity",
              text: `${entity}`,
              displayText: `${entity}`,
              description: this.description,
              rightLabel: this.rightLabel
            }, entityName));
          }
          continue;
        }
      }
      if (entity.startsWith(entityName)) {
        output.push(this.sanitize({
          type: "entity",
          text: entity,
          displayText: entity,
          description: this.description,
          rightLabel: this.rightLabel
        }, entityName));
      }
    }
    return output;
  }
}

module.exports = EntityOutput;
