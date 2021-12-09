const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput");

class SetWorldSpawnCommand extends BaseCommand {
  constructor() {super("setworldspawn");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("setworldspawn", "Sets the world spawn.")];
      }
      case 2:
      case 3:
      case 4: {
        return [(new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 2).join(" "), "~", 5 - tokens.length, "Coordinate to set the world spawn.")).optional()];
      }
      case 5: {
        return [(new NumberOutput("angle", "The angle in which players who spawn in should be facing.", "0")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new SetWorldSpawnCommand
};
