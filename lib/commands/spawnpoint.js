const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput");

class SpawnpointCommand extends BaseCommand {
  constructor() {super("spawnpoint");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("spawnpoint", "Sets the world spawn.")];
      }
      case 2: {
        return [(new SelectorOutput(null, "targets")).optional()];
      }
      case 3:
      case 4:
      case 5: {
        return [(new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 3).join(" "), "~", 6 - tokens.length, "Coordinate to set the world spawn.")).optional()];
      }
      case 6: {
        return [(new NumberOutput("angle", "The angle in which players who spawn in should be facing.", "0")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new SpawnpointCommand
};
