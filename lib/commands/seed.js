const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput");

class SeedCommand extends BaseCommand {
  constructor() {super("seed");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("seed", "Gets the world seed.")];
      }
    }
  }
}

module.exports = {
  "1.12": new SeedCommand
};
