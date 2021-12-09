const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput");

class WorldborderCommand extends BaseCommand {
  constructor() {super("worldborder");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("worldborder", "Manages the world border.")];
      }
      case 2: {
        return [new EnumOutput(
          ["add", "Sub Command", "Increases or decreases the world border"],
          ["center", "Sub Command", "Re-centers the world boundary"],
          ["damage", "Sub Command", "Manages the world boundary damage"],
          ["get", "Sub Command", "Gets the current world boundary size"],
          ["set", "Sub Command", "Sets the world boundary size"],
          ["warning", "Sub Command", "Manages the world boundary warnings"]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "add":
      case "set": {
        if (tokens.length === 3) {
          return [new NumberOutput("distance", "The distance to add/set the worldborder to")];
        } else if (tokens.length === 4) {
          return [(new NumberOutput("time", "The time in seconds for the world border to change to the new value")).optional()];
        }
        break;
      }
      case "center": {
        if (tokens.length >= 3 && tokens.length <= 4) {
          return [new CoordinateOutput(
            ["x", "z"].slice(tokens.length - 3).join(" "),
            "~",
            5 - tokens.length,
            "The x/z position to center the world border at"
          )];
        }
        break;
      }
      case "warning": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["distance", "Sub Command", "Sets the world border warning distance"],
            ["time", "Sub Command", "Sets the world border warning time"]
          )];
        } else if (tokens.length === 4) {
          const subCommand = tokens[2].getValue();
          if (subCommand === "distance") {
            return [new NumberOutput("distance", "The distance away from the border to warn players", "16")];
          } else if (subCommand === "time") {
            return [new NumberOutput("time", "The number of seconds before a player is displayed the warning")];
          }
        }
        break;
      }
      case "damage": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["amount", "Sub Command", "Sets the damage given to players outside of the world border."],
            ["buffer", "Sub Command", "Sets a buffer for the border damage. Players within the buffer will not take damage."]
          )];
        } else if (tokens.length === 4) {
          const subCommand = tokens[2].getValue();
          if (subCommand === "amount") {
            return [new NumberOutput("damagePerBlock", "Sets the damage/second. This is multiplied by the distance to the world border buffer.")];
          } else if (subCommand === "buffer") {
            return [new NumberOutput("distance", "Sets the buffer distance. Players will not take damage until they move past this distance from the world border.")];
          }
        }
      }
    }
  }
}
  
module.exports = {
  "1.12": new WorldborderCommand
};