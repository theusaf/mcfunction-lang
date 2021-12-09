const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput");

class DatapackCommand extends BaseCommand {
  
  constructor() {super("datapack");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("datapack", "Controls loading/unloading of datapacks")];
      }
      case 2: {
        return [new EnumOutput(
          ["disable", "Sub Command", "Disables a data pack"],
          ["enable", "Sub Command", "Enables a data pack"],
          ["list", "Sub Command", "Lists data packs"]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "list": {
        if (tokens.length === 3) {
          return [(new EnumOutput(
            ["available", "Type", "List all available datapacks"],
            ["enabled", "Type", "List all enabled datapacks"]
          )).optional()];
        }
        break;
      }
      case "disable": {
        if (tokens.length === 3) {
          return [new StringOutput("${1:name}", "The datapack to disable", true, "name")];
        }
        break;
      }
      case "enable": {
        switch (tokens.length) {
          case 3: {
            return [new StringOutput("${1:name}", "The datapack to enable", true, "name")];
          }
          case 4: {
            return [(new EnumOutput(
              ["first", "Priority", "Enable the datapack with highest priority (runs first)"],
              ["last", "Priority", "Enable the datapack with lowest priority (runs last)"],
              ["before", "Priority Moded", "Enable the datapack with a priority lower than another datapack"],
              ["after", "Priority Mode", "Enable the datapack with a priority higher than another datapack"]
            )).optional()];
          }
          case 5: {
            if (["before", "after"].includes(tokens[3].getValue())) {
              return [new StringOutput("${1:existing}", "The other datapack to use as a reference point", true, "existing")];
            }
          }
        }
      }
    }
  }

} 
  
module.exports = {
  "1.13": new DatapackCommand
};