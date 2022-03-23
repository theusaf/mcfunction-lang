const CommandBuilder = require("../class/CommandBuilder");

const summonCommandBuilder = new CommandBuilder("summon")
  .setDescription("Summons an entity.")
  .addEntityOption("entity")
  .addCoordinateOption("position", 3)
  .addNBTOption("nbt");

module.exports = {
  "1.12": {
    name: "summon",
    builder: summonCommandBuilder
  }
};