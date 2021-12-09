const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  BooleanOutput = require("../class/output/BooleanOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class BossbarCommand extends BaseCommand {
  constructor() {super("bossbar");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("bossbar", "Modifies and interacts with bossbars")];
      }
      case 2: {
        return [new EnumOutput(
          ["add", "Sub Command", "Creates a new boss bar."],
          ["get", "Sub Command", "Gets information about a boss bar."],
          ["list", "Sub Command", "Lists boss bars."],
          ["remove", "Sub Command", "Removes a boss bar."],
          ["set", "Sub Command", "Modifies a boss bar."]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "add": {
        if (tokens.length === 3) {
          return [new StringOutput("${1:id}", "The boss bar id", true, "id")];
        } else if (tokens.length === 4) {
          return [new StringOutput(
            "${1:{\"text\":\"example\"}}",
            "The JSON display name of the boss bar",
            true,
            "name"
          )];
        }
        break;
      }
      case "remove": {
        if (tokens.length === 4) {
          return [new StringOutput("${1:id}", "The boss bar id to remove", true, "id")];
        }
        break;
      }
      case "set": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["color", "Setting", "Sets the boss bar's text color"],
            ["max", "Setting", "Sets the boss bar's maximum value"],
            ["name", "Setting", "Sets the boss bar's name"],
            ["players", "Setting", "Sets the players that can see the boss bar"],
            ["style", "Setting", "Sets the boss bar's style"],
            ["value", "Setting", "Sets the boss bar's value"],
            ["visible", "Setting", "Sets whether the boss bar is visible"]
          )];
        } else if (tokens.length === 4) {
          const subCommand = tokens[2].getValue();
          switch (subCommand) {
            case "color": {
              return [new EnumOutput(
                ["blue", "color"],
                ["green", "color"],
                ["pink", "color"],
                ["purple", "color"],
                ["red", "color"],
                ["white", "color"],
                ["yellow", "color"]
              )];
            }
            case "max": {
              return [new NumberOutput("max", "The maximum value of the boss bar", "100")];
            }
            case "name": {
              return [new StringOutput(
                "${1:{\"text\":\"example\"}}",
                "The JSON display name of the boss bar",
                true,
                "name"
              )];
            }
            case "players": {
              return [(new SelectorOutput("Sets the players who can see the boss bar. If omitted, clears all players.", "targets")).optional()];
            }
            case "style": {
              return [new EnumOutput(
                ["notched_6", "style"],
                ["notched_10", "style"],
                ["notched_12", "style"],
                ["notched_20", "style"],
                ["progress", "style"]
              )];
            }
            case "value": {
              return [new NumberOutput("value", "The value to set the boss bar to")];
            }
            case "visible": {
              return [new BooleanOutput("visible")];
            }
          }
        }
      }
    }
  }
}

module.exports = {
  "1.13": new BossbarCommand
};