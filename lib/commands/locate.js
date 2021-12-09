const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StructureOutput = require("../class/output/StructureOutput");

class LocateCommand extends BaseCommand {
  constructor() {
    super("locate");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("locate", "Locates a structure type")];
      }
      case 2: {
        return [new StructureOutput(null, "structure")];
      }
    }
  }
}

module.exports = {
  "1.12": new LocateCommand
};
