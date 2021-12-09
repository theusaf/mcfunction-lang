const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  BooleanOutput = require("../class/output/BooleanOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  ScoreboardDisplayOutput = require("../class/output/ScoreboardDisplayOutput"),
  ObjectiveOutput = require("../class/output/ObjectiveOutput"),
  NBTOutput = require("../class/output/NBTOutput");

class ScoreboardCommand12 extends BaseCommand {
  constructor() {super("scoreboard");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("scoreboard", "Interacts with scoreboards and related data.")];
      }
      case 2: {
        return [new EnumOutput(
          ["objectives", "Sub Command", "Add, remove, and edit scoreboard objectives."],
          ["players", "Sub Command", "Add, remove, and modify the objective scores of players."],
          ["teams", "Sub Command", "Add, remove, and edit teams."]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "objectives": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["list", "Objectives Sub Command", "List all objectives."],
            ["add", "Objectives Sub Command", "Add a new objective."],
            ["remove", "Objectives Sub Command", "Remove an objective."],
            ["setdisplay", "Objectives Sub Command", "Set where the objective stats display."]
          )];
        } else {
          const subValue = tokens[2].getValue(),
            subCommands = new Set(["list", "add", "remove", "setdisplay"]);
          if (
            (tokens.length >= 4 && subValue === "list") ||
            (tokens.length >= 5 && subValue === "remove") ||
            (tokens.length >= 6 && subValue === "setdisplay")
          ) {
            return;
          }
          switch (tokens.length) {
            case 4: {
              if (subValue === "setdisplay") {
                return [new ScoreboardDisplayOutput];
              } else if (subCommands.has(subValue)) {
                return [new StringOutput("${1:name}", "The name of the objective.", true, "name")];
              }
              break;
            }
            case 5: {
              if (subValue === "setdisplay") {
                return [(new StringOutput("${1:objective}", "The objective to modify.", true, "objective")).optional()];
              } else if (subCommands.has(subValue)) {
                return [new ObjectiveOutput];
              }
              break;
            }
            default: {
              if (subCommands.has(subValue)) {
                return [(new StringOutput("$1", null, true, "display name")).optional()];
              }
            }
          }
        }
        break;
      }
      case "players": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["list", "Players Sub Command", "List all tracked entities or scores of a tracked entity."],
            ["set", "Players Sub Command", "Set the score of an entity for an objective."],
            ["add", "Players Sub Command", "Increments the entity's score in an objective."],
            ["remove", "Players Sub Command", "Decrements the entity's score in an objective."],
            ["reset", "Players Sub Command", "Deletes the score, or all scores for an entity."],
            ["enable", "Players Sub Command", "Enables an entity to use the /trigger command on an objective."],
            ["test", "Players Sub Command", "Tests the value of an entity's score."],
            ["operation", "Players Sub Command", "Applies arithmetic operations on entity's scores."],
            ["tag", "Players Sub Command", "Adds, removes, and manages tags on entities."]
          )];
        } else {
          const subValue = tokens[2].getValue(),
            subCommands = new Set(["list", "set", "add", "remove", "reset", "enable", "test", "operation", "tag"]);
          if (subValue === "tag") {
            if (tokens.length > 5 && tokens[4].getValue() === "list") {
              return;
            }
            const tagCommands = new Set(["add", "remove", "list"]);
            switch (tokens.length) {
              case 4: {
                return [new SelectorOutput];
              }
              case 5: {
                return [new EnumOutput(
                  ["add", "Tag Sub Command", "Adds a tag."],
                  ["remove", "Tag Sub Command", "Removes a tag."],
                  ["list", "Tag Sub Command", "Lists the tags."]
                )];
              }
              case 6: {
                if (tagCommands.has(tokens[4].getValue())) {
                  return [new StringOutput("${1:tagName}", "The tag to add.", true, "tagName")];
                }
                break;
              }
              case 7: {
                if (tagCommands.has(tokens[4].getValue())) {
                  return [(new NBTOutput("dataTag", "The NBT data the entity must match.")).optional()];
                }
              }
            }
            return;
          }
          if (
            (tokens.length > 4 && subValue === "list") ||
            (tokens.length > 5 && ["reset", "enable"].includes(subValue)) ||
            (tokens.length > 7 && ["test", "enable", "remove", "set", "add"].includes(subValue))
          ) {
            return;
          }
          switch (tokens.length) {
            case 4: {
              if (subValue === "list" || subValue === "operation") {
                return [
                  (new StringOutput("*", "Selects all tracked entities.")).optional(),
                  (new SelectorOutput).optional()
                ];
              } else if (subCommands.has(subValue)) {
                return [new SelectorOutput];
              }
              break;
            }
            case 5: {
              if (subValue === "reset") {
                return [(new StringOutput("${1:objective}", "The objective the entity's score is being reset in.", true, "objective")).optional()];
              } else if (subValue === "enable") {
                return [new StringOutput("${1:trigger}", "The trigger objective to enable.", true, "trigger")];
              } else if (subValue === "operation") {
                return [new StringOutput("${1:targetObjective}", "The objective the target's score is being modified in.", true, "targetObjective")];
              } else if (subCommands.has(subValue)) {
                return [new StringOutput("${1:objective}", "The objective to modify or query.", true, "objective")];
              }
              break;
            }
            case 6: {
              switch (subValue) {
                case "set": {
                  return [new NumberOutput("score", "The score value to set.", "0")];
                }
                case "add": {
                  return [new NumberOutput("count", "The score value to add.", "1")];
                }
                case "remove": {
                  return [new NumberOutput("count", "The score value to remove.", "1")];
                }
                case "test": {
                  return [
                    new NumberOutput("min", "The minimum value to check.", "0"),
                    new StringOutput("*", "Represents -2147483648.")
                  ];
                }
                case "operation": {
                  return [new EnumOutput(
                    ["+=", "Operation", "Addition. Adds the selector's score to the target's score."],
                    ["-=", "Operation", "Subtraction. Subtracts the selector's score from the target's score"],
                    ["*=", "Operation", "Multiplication. Multiplies the target's score by the selector's score."],
                    ["%=", "Operation", "Modular Division. Sets the target's score to the remainder of the division between the target and the selector's score."],
                    ["=", "Operation", "Assign. Sets the target's score to the selector's score."],
                    ["<", "Operation", "Min. If the selector's score is less than the target's score, set the target's score to the selector's score."],
                    [">", "Operation", "Max. If the selector's score is more than the target's score, set the target's score to the selector's score."],
                    ["><", "Operation", "Swap. Swaps target and selector's scores."]
                  )];
                }
              }
              break;
            }
            case 7: {
              switch (subValue) {
                case "set":
                case "add":
                case "remove": {
                  return [(new NBTOutput("dataTag", "The nbt data the entity must match with.")).optional()];
                }
                case "test": {
                  return [(new NumberOutput("max", "The maximum value to check.", "0")).optional()];
                }
                case "operation": {
                  return [new SelectorOutput];
                }
              }
              break;
            }
            case 8: {
              if (subValue === "operation") {
                return [new StringOutput("${1:objective}", "The objective to use for selector and target.", true, "objective")];
              }
            }
          }
        }
        break;
      }
      case "teams": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["list", "Teams Sub Command", "List teams or entities in a team."],
            ["add", "Teams Sub Command", "Create a team."],
            ["remove", "Teams Sub Command", "Remove a team."],
            ["empty", "Teams Sub Command", "Removes all entities from a team."],
            ["join", "Teams Sub Command", "Assigns specified entities to a team."],
            ["leave", "Teams Sub Command", "Removes specified entities from a team."],
            ["option", "Teams Sub Command", "Modifies team settings."]
          )];
        } else {
          const subValue = tokens[2].getValue();
          if (
            (tokens.length > 4 && ["list", "remove", "empty", "leave"].includes(subValue)) ||
            (tokens.length > 5 && ["add", "join"].includes(subValue))
          ) {
            return;
          }
          switch (tokens.length) {
            case 4: {
              if (subValue === "leave") {
                return [(new SelectorOutput).optional()];
              } else if (subValue === "list") {
                return [(new StringOutput("${1:teamname}", "The team name to use.", true, "team name")).optional()];
              } else {
                return [new StringOutput("${1:teamname}", "The team name to use.", true, "team name")];
              }
            }
            case 5: {
              if (subValue === "add") {
                return [(new StringOutput("${1:display name}", "The team's displayed name.", true, "display name")).optional()];
              } else if (subValue === "join") {
                return [new SelectorOutput];
              } else if (subValue === "option") {
                return [new EnumOutput(
                  ["color", "Option Setting", "Change the color of the team."],
                  ["friendlyfire", "Option Setting", "Change whether friendly fire is enabled in the team."],
                  ["seeFriendlyInvisibles", "Option Setting", "Change whether team members can see invisible team members."],
                  ["nametagVisibility", "Option Setting", "Change visibility of name tags for a team."],
                  ["deathMessageVisibility", "Option Setting", "Change visibility of death messages for a team."],
                  ["collisionRule", "Option Setting", "Change the collision effects for a team."]
                )];
              }
              break;
            }
            case 6: {
              const subOption = tokens[4].getValue();
              if (subValue === "option") {
                switch (subOption) {
                  case "color": {
                    return [new EnumOutput(
                      ["black", "color"],
                      ["dark_blue", "color"],
                      ["dark_green", "color"],
                      ["dark_aqua", "color"],
                      ["dark_red", "color"],
                      ["dark_purple", "color"],
                      ["gold", "color"],
                      ["gray", "color"],
                      ["dark_gray", "color"],
                      ["blue", "color"],
                      ["green", "color"],
                      ["aqua", "color"],
                      ["red", "color"],
                      ["light_purple", "color"],
                      ["yellow", "color"],
                      ["white", "color"],
                      ["reset", "color", "Resets the color to the default color and formatting."]
                    )];
                  }
                  case "friendlyfire": {
                    return [new BooleanOutput("value", "Whether friendly fire should be enabled or not.")];
                  }
                  case "seeFriendlyInvisibles": {
                    return [new BooleanOutput("value", "Whether team members should be able to see invisible team members")];
                  }
                  case "nametagVisibility": {
                    return [new EnumOutput(
                      ["never", "Mode", "Entities in the team will not render name tags."],
                      ["hideForOtherTeam", "Mode", "Entities ouside of the team will not be able to see the team members's nametags."],
                      ["hideForOwnTeam", "Mode", "Entities inside the team will not be able to see the team member's nametags."],
                      ["always", "Mode", "All entities will render and see the team member's name tags."]
                    )];
                  }
                  case "deathMessageVisibility": {
                    return [new EnumOutput(
                      ["never", "Mode", "Player deaths will not appear in chat."],
                      ["hideForOtherTeam", "Mode", "Player deaths will only appear for the team members."],
                      ["hideForOwnTeam", "Mode", "Player deaths will only appear for non-team members."],
                      ["always", "Mode", "Player deaths will show in chat."]
                    )];
                  }
                  case "collisionRule": {
                    return [new EnumOutput(
                      ["never", "Mode", "Entities in the team will not collide with any other entity."],
                      ["always", "Mode", "Entities in the team will always collide with other entities."],
                      ["pushOwnTeam", "Mode", "Entities in the team will collide with team members, but not entities outside of the team.\nNote: effect is actually opposite: MC-87984"],
                      ["pushOtherTeams", "Mode", "Entities in the team will only push entities on opposing teams.\nNote: effect is actually opposite: MC-87984"]
                    )];
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

class ScoreboardCommand13 extends ScoreboardCommand12 {

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 2: {
        return [new EnumOutput(
          ["objectives", "Sub Command", "Add, remove, and edit scoreboard objectives."],
          ["players", "Sub Command", "Add, remove, and modify the objective scores of players."]
        )];
      }
    }
    if (tokens.length > 1) {
      const subCommand = tokens[1].getValue();
      if (subCommand === "players") {
        if (tokens.length === 3) {
          [new EnumOutput(
            ["list", "Players Sub Command", "List all tracked entities or scores of a tracked entity."],
            ["set", "Players Sub Command", "Set the score of an entity for an objective."],
            ["add", "Players Sub Command", "Increments the entity's score in an objective."],
            ["remove", "Players Sub Command", "Decrements the entity's score in an objective."],
            ["reset", "Players Sub Command", "Deletes the score, or all scores for an entity."],
            ["enable", "Players Sub Command", "Enables an entity to use the /trigger command on an objective."],
            ["test", "Players Sub Command", "Tests the value of an entity's score."],
            ["operation", "Players Sub Command", "Applies arithmetic operations on entity's scores."]
          )];
        }
      } else if (subCommand === "objectives") {
        if (tokens.length === 3) {
          const output = super.handleSuggestions(tokens);
          output.push(
            new EnumOutput(
              ["modify", "Objectives Sub Command", "Modifies things about the scoreboard objective"]
            )
          );
          return output;
        } else {
          const subCommand = tokens[2].getValue();
          if (subCommand === "modify") {
            switch (tokens.length) {
              case 4: {
                return [new StringOutput("${1:name}", "The name of the objective.", true, "name")];
              }
              case 5: {
                return [new EnumOutput(
                  ["displayname", "Setting", "Change the objective's display name"],
                  ["rendertype", "Setting", "Change the objective's score rendering"]
                )];
              }
              case 6: {
                const subCommand = tokens[4].getValue();
                if (subCommand === "displayname") {
                  return [new NBTOutput("displayName", "The raw JSON display text", "{\"text\":\"name\"}")];
                } else if (subCommand === "rendertype") {
                  return [new EnumOutput(
                    ["hearts", "Type"],
                    ["integer", "Type"]
                  )];
                }
              }
            }
          }
        }
      }
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new ScoreboardCommand12,
  "1.13": new ScoreboardCommand13
};
