const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  BiomeOutput = require("../class/output/BiomeOutput");

class LocateBiomeCommand extends BaseCommand {

  constructor() {super("locatebiome");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("locatebiome", "Locates a biome")];
      }
      case 2: {
        return [new BiomeOutput(null, "biome")];
      }
    }
  }

}

module.exports = {
  "1.16": new LocateBiomeCommand
};