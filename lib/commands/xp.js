const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class XPCommand12 extends BaseCommand {
  constructor() {super("xp");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("xp", "Manages experience of players.")];
      }
      case 2: {
        return [
          new NumberOutput("amount", "The amount of experience points to grant/remove", "100"),
          new StringOutput("${1:1}L", "The amount of levels to grant/remove", true, "amount (L)")
        ];
      }
      case 3: {
        return [(new SelectorOutput("The target(s) to grant/remove experience from.", "target")).optional()];
      }
    }
  }
}

class ExperienceCommand13 extends BaseCommand {
  constructor() {super(["experience", "xp"]);}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [
          new CommandNameOutput("xp", "Give and take experience from players."),
          new CommandNameOutput("experience", "Give and take experience from players.")
        ];
      }
      case 2: {
        return [new EnumOutput(
          ["add", "Sub Command", "Give and take experiece"],
          ["set", "Sub Command", "Set experience"],
          ["query", "Sub Command", "Get experience"]
        )];
      }
      case 3: {
        return [new SelectorOutput("Targets to get/add/set experience on")];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "query": {
        if (tokens.length === 4) {
          return [new EnumOutput(
            ["levels", "Metric"],
            ["points", "Metic"]
          )];
        }
        break;
      }
      case "add":
      case "set": {
        if (tokens.length === 4) {
          return [new NumberOutput("amount", "The amount of experience to give/take", "1")];
        } else if (tokens.length === 5) {
          return [new EnumOutput(
            ["levels", "Metric"],
            ["points", "Metic"]
          )];
        }
      }
    }
  }
}

module.exports = {
  "1.12": new XPCommand12,
  "1.13": new ExperienceCommand13
};