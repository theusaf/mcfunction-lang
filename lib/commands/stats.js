const BaseCommand = require("../class/BaseCommand"),
  NullCommand = require("../class/NullCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput");

class StatsCommand extends BaseCommand {
  constructor() {super("stats");}

  handleSuggestions(tokens) {
    let index = tokens.length;
    if (tokens.length > 2) {
      const mode = tokens[1].getValue();
      if (mode === "entity") {
        index += 2;
      }
      if (!["block", "entity"].includes(tokens[1].getValue())) {
        return;
      }
      if (index > 6) {
        const modeIndex = index > tokens.length ? 3 : 5,
          mode2 = tokens[modeIndex].getValue();
        if (!["set", "clear"].includes(mode2)) {
          return;
        }
        if (index > 7 && mode2 === "clear") {return;}
      }
    }
    switch (index) {
      case 1: {
        return [new CommandNameOutput("stats", "Gets stats from command results.")];
      }
      case 2: {
        return [new EnumOutput(
          ["block", "Stats Mode", "Get stats from a block."],
          ["entity", "Stats Mode", "Gets stats from an entity."]
        )];
      }
      case 3: {
        return [new CoordinateOutput("x y z", "~", 3, "The checked block position.")];
      }
      case 4:
      case 5: {
        if (tokens[1].getValue() === "block") {
          return [new CoordinateOutput(["x", "y", "Z"].slice(tokens.length - 3).join(" "), "~", 6 - tokens.length, "The checked block position.")];
        } else {
          return [new SelectorOutput("The target to query.", "target")];
        }
      }
      case 6: {
        return [new EnumOutput(
          ["set", "Mode", "Takes and sets the stat somewhere."],
          ["clear", "Mode", "Clears the stat."]
        )];
      }
      case 7: {
        return [new EnumOutput(
          ["AffectedBlocks", "stat", "Returns the number of blocks affected by a command."],
          ["AffectedEntities", "stat", "Returns the number of entities affected by a command."],
          ["AffectedItems", "stat", "Returns the number of items affected by a command."],
          ["QueryResult", "stat", "Returns the result of a command query."],
          ["SucessCount", "stat", "Returns a command's success count."]
        )];
      }
      case 8: {
        return [new SelectorOutput("The target to save the stats to.", "selector")];
      }
      case 9: {
        return [new StringOutput("${1:objective}", "The scoreboard objective to store the stat.", true, "objective")];
      }
    }
  }
}

module.exports = {
  "1.12": new StatsCommand,
  "1.13": new NullCommand
};
