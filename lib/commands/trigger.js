const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  NumberOutput = require("../class/output/NumberOutput");

class TriggerCommand12 extends BaseCommand {
  constructor() {super("trigger");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("trigger", "Modifies scoreboard objectives with a trigger criterion.")];
      }
      case 2: {
        return [new StringOutput("${1:objective}", "The objective to modify", true, "objective")];
      }
      case 3: {
        return [new EnumOutput(
          ["add", "Sub Command", "Adds a value to the scoreboard."],
          ["set", "Sub Command", "Sets the value to the scoreboard."]
        )];
      }
      case 4: {
        const subCommand = tokens[2].getValue();
        if (["add", "set"].includes(subCommand)) {
          return [new NumberOutput("value", "The value to add/set", "1")];
        }
      }
    }
  }
}

class TriggerCommand13 extends TriggerCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length === 3) {
      return [(new EnumOutput(
        ["add", "Sub Command", "Adds a value to the scoreboard."],
        ["set", "Sub Command", "Sets the value to the scoreboard."]
      )).optional()];
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new TriggerCommand12,
  "1.13": new TriggerCommand13
};