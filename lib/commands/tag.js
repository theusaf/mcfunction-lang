const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class TagCommand extends BaseCommand {

  constructor() {super("tag");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("tag", "Manage scoreboard tags")];
      }
      case 2: {
        return [new SelectorOutput("The targets to modify tags on", "targets")];
      }
      case 3: {
        return [new EnumOutput(
          ["add", "Sub Command", "Add tags to entities"],
          ["remove", "Sub Command", "Remove tags from entities"],
          ["list", "Sub Command", "List tags on an entity"]
        )];
      }
      case 4: {
        if (["add", "remove"].includes(tokens[2].getValue())) {
          return [new StringOutput(
            "${1:name}",
            "The tag to add",
            true,
            "name"
          )];
        }
      }
    }
  }

}

module.exports = {
  "1.13": new TagCommand
};