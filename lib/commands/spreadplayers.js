const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  BooleanOutput = require("../class/output/BooleanOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  StringOutput = require("../class/output/StringOutput");

class SpreadplayersCommand12 extends BaseCommand {
  constructor() {super("spreadplayers");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("spreadplayers", "Spreads entities to random surfaces within an area.")];
      }
      case 2:
      case 3: {
        return [new CoordinateOutput(["x", "z"].slice(tokens.length - 2).join(" "), "~", 4 - tokens.length, "Center location of the spread area.")];
      }
      case 4: {
        return [new NumberOutput("spreadDistance", "The minimum distance between targets.", "0")];
      }
      case 5: {
        return [new NumberOutput("maxRange", "The maximum distance from the center position targets can be spread. Must be at least 1 more than the spreadDistance.", "10")];
      }
      case 6: {
        return [new BooleanOutput("respectTeams", "Whether to keep team members together.", "false")];
      }
      case 7: {
        return [new SelectorOutput(null, "targets")];
      }
    }
  }
}

class SpreadplayersCommand16 extends SpreadplayersCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length === 6) {
      return super.handleSuggestions(tokens).concat([
        new StringOutput("under", "Option to specify a maximum height", false)
      ]);
    } else if (tokens.length >= 7) {
      if (tokens[5].getValue() === "under") {
        if (tokens.length === 7) {
          return [new NumberOutput("maxHeight", "The maximum height to spread players under", "127")];
        }
        tokens.splice(tokens.length - 2, 2);
      }
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new SpreadplayersCommand12,
  "1.16": new SpreadplayersCommand16
};
