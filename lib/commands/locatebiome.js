const { CommandBuilder } = require("../class/builders");

const locateBiomeCommandBuilder16 = new CommandBuilder("locatebiome")
    .setDescription("Locates biomes in the world.")
    .addBiomeOption("biome"),

  locateBiomeCommandBuilder18_2 = new CommandBuilder("locatebiome")
    .setDescription("Locates biomes in the world.")
    .addBiomeOption("biome", (opt) => {
      opt.includeTags();
    });

module.exports = {
  "1.16": {
    name: "locatebiome",
    builder: locateBiomeCommandBuilder16
  },
  "1.18.2": {
    name: "locatebiome",
    builder: locateBiomeCommandBuilder18_2
  }
};