const BaseOption = require("../BaseOption"),
  VersionLoader = require("../../util/VersionLoader");

/**
 * Represents a loot table option.
 */
class LootTableOption extends BaseOption {

  reformatOutput(lastToken) {
    const { loot_table: loot_tables } = VersionLoader.ids,
      result = [];
    for (const loot_table of loot_tables) {
      if (loot_table.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: loot_table
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = LootTableOption;