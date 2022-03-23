const { CommandBuilder } = require("../class/builders");

const locateBiomeCommandBuilder = new CommandBuilder("locatebiome")
  .setDescription("Locates biomes in the world.")
  .addBiomeOption("biome");

module.exports = {
  "1.16": {
    name: "locatebiome",
    builder: locateBiomeCommandBuilder
  }
};