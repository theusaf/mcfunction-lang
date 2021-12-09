const Output = require("../Output"),
  VersionLoader = require("../../util/VersionLoader");

class LootTableOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const {loot_table} = VersionLoader.ids,
      output = [],
      tokenValue = lastToken.getValue();
    for (const loot of loot_table) {
      if (loot.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        output.push({
          type: "loot_table",
          text: loot,
          displayText: loot,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = LootTableOutput;
  