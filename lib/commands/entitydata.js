const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  NBTOutput = require("../class/output/NBTOutput"),
  NullCommand = require("../class/NullCommand");

/**
 * entitydata <target> <dataTag>
 */
class EntityDataCommand12 extends BaseCommand {
  constructor() {
    super("entitydata");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("entitydata", "Modifies entity nbt data.")];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
      }
      case 3: {
        return [new NBTOutput("dataTag")];
      }
    }
  }
}

module.exports = {
  "1.12": new EntityDataCommand12,
  "1.13": new NullCommand
};
