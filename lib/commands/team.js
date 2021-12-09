const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  BooleanOutput = require("../class/output/BooleanOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class TeamCommand extends BaseCommand {

  constructor() {super("team");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("team", "Interacts and manages scoreboard teams.")];
      }
      case 2: {
        return [new EnumOutput(
          ["list", "Sub Command", "List teams"],
          ["add", "Sub Command", "Create new teams"],
          ["remove", "Sub Command", "Remove teams"],
          ["empty", "Sub Command", "Remove entities from team"],
          ["join", "Sub Command", "Add entities to team"],
          ["leave", "Sub Command", "Make entities leave their teams"],
          ["modify", "Sub Command", "Modify settings for the team"]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "add": {
        if (tokens.length === 3) {
          return [new StringOutput("${1:team}", "The name of the team to add.", true, "team")];
        } else if (tokens.length === 4) {
          return [(new StringOutput(
            "${1:{\"text\":\"my team name\"}}",
            "The raw JSON team name",
            true,
            "displayName"
          )).optional()];
        }
        break;
      }
      case "list": {
        if (tokens.length === 3) {
          return [(new StringOutput("${1:team}", "The team to get information from.", true, "team")).optional()];
        }
        break;
      }
      case "empty":
      case "remove": {
        if (tokens.length === 3) {
          return [new StringOutput("${1:team}", "The team to interact with.", true, "team")];
        }
        break;
      }
      case "join": {
        if (tokens.length === 3) {
          return [new StringOutput("${1:team}", "The team to add entities to.", true, "team")];
        } else if (tokens.length === 4) {
          return [(new SelectorOutput("The entities to add to the team", "memberes")).optional()];
        }
        break;
      }
      case "leave": {
        if (tokens.length === 3) {
          return [new SelectorOutput("The entities to make leave their teams", "memberes")];
        }
        break;
      }
      case "modify": {
        switch (tokens.length) {
          case 3: {
            return [new StringOutput("${1:team}", "The team to modify", true, "team")];
          }
          case 4: {
            return [new EnumOutput(
              ["displayName", "Setting", "Set the display name of the team"],
              ["color", "Setting", "Set the team's color"],
              ["friendlyFire", "Setting", "Set whether team members can damage each other"],
              ["seeFriendlyInvisibles", "Setting", "Set whether team members can see invisible team members"],
              ["nametagVisibility", "Setting", "Set who can see team members' nametags"],
              ["deathMessageVisibility", "Setting", "Set who can see team members' death messages"],
              ["collisionRule", "Setting", "Control how collisions work between entities in the team and other entities"],
              ["prefix", "Setting", "Modify the prefix before players' names"],
              ["suffix", "Setting", "Modify the suffix after player's names"]
            )];
          }
        }
        if (tokens.length !== 5) {return;}
        const setting = tokens[3].getValue();
        switch (setting) {
          case "prefix":
          case "suffix":
          case "displayName": {
            return [new StringOutput(
              "${1:{\"text\":\"example\"}}",
              "The raw JSON text",
              true,
              "text"
            )];
          }
          case "color": {
            return [new EnumOutput(
              ["reset", "color"],
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
              ["white", "color"]
            )];
          }
          case "friendlyFire":
          case "seeFriendlyInvisibles": {
            return [new BooleanOutput("allowed")];
          }
          case "nametagVisibility":
          case "deathMessageVisibility": {
            return [new EnumOutput(
              ["never", "option", "Never shown"],
              ["hideForOtherTeams", "option", "Not shown to other teams"],
              ["hideForOwnTeam", "option", "Not shown to team members"],
              ["always", "option", "Seen by all"]
            )];
          }
          case "collisionRule": {
            return [new EnumOutput(
              ["always", "option", "Normal collision"],
              ["never", "option", "No collision"],
              ["pushOtherTeams", "option", "Entities in the team can be pushed only be another entity in the team.\nSee: MC-87984"],
              ["pushOwnTeam", "option", "Entities in the team cannot be pushed by another entity in the team\nSee: MC-87984"]
            )];
          }
        }
      }
    }
  }

}

module.exports = {
  "1.13": new TeamCommand
};