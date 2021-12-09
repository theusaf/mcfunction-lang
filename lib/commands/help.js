// because it is technically a valid command to run
const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput");

class HelpCommand extends BaseCommand {
  constructor() {super(["help", "?"]);}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [
          new CommandNameOutput("help", "Gets the help documentation. Mostly useless in functions."),
          new CommandNameOutput("?", "Gets the help documentation. Mostly useless in functions.")
        ];
      }
      case 2: {
        return [
          (new NumberOutput("page", "The help page number to get.")).optional()
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new HelpCommand
};
