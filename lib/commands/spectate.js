const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class SpectateCommand extends BaseCommand {

  constructor() {super("spectate");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("spectate", "Make a player spectate an entity.")];
      }
      case 2: {
        return [(new SelectorOutput("The single target to be spectated. If omitted, the executor stops spectating.", "target")).optional()];
      }
      case 3: {
        return [(new SelectorOutput("The single player to spectate the target.", "player")).optional()];
      }
    }
  }

}

module.exports = {
  "1.15": new SpectateCommand
};