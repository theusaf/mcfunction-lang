const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  AttributeOutput = require("../class/output/AttributeOutput");

class AttributeCommand extends BaseCommand {

  constructor() {super("attribute");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("attribute", "Change or read attributes")];
      }
      case 2: {
        return [new SelectorOutput("The single entity to get/set attributes on", "target")];
      }
      case 3: {
        return [new AttributeOutput(null, "attribute")];
      }
      case 4: {
        return [new EnumOutput(
          ["get", "Sub Command", "Get details about the attribute"],
          ["base", "Sub Command", "Get/Set details about the base attribute"],
          ["modifier", "Sub Command", "Get/Set details about the attribute modifier"]
        )];
      }
    }
    const subCommand = tokens[3].getValue();
    switch (subCommand) {
      case "get": {
        if (tokens.length === 5) {
          return [(new NumberOutput("scale", "The number to scale the output by", "1")).optional()];
        }
        break;
      }
      case "base": {
        if (tokens.length === 5) {
          return [new EnumOutput(
            ["get", "Base Mode"],
            ["set", "Base Mode"]
          )];
        }
        const subCommand = tokens[4].getValue();
        if (tokens.length === 6) {
          if (subCommand === "set") {
            return [new NumberOutput("value", "The value to set the base to")];
          } else if (subCommand === "get") {
            return [(new NumberOutput("scale", "The number to scale the output by", "1")).optional()];
          }
        }
        break;
      }
      case "modifier": {
        if (tokens.length === 5) {
          return [new EnumOutput(
            ["add", "Modifier Mode"],
            ["remove", "Modifier Mode"],
            ["value", "Modifier Mode"]
          )];
        }
        const subCommand = tokens[4].getValue();
        switch (subCommand) {
          case "add": {
            switch (tokens.length) {
              case 6: {
                return [new StringOutput("${1:uuid}", "The UUID of the attribute modifier", true, "uuid")];
              }
              case 7: {
                return [new StringOutput("${1:name}", "The name of the attribute modifier", true, "name")];
              }
              case 8: {
                return [new NumberOutput("value", "The value of the modifier")];
              }
              case 9: {
                return [new EnumOutput(
                  ["add", "Modifier Type", "Adds a value to the total"],
                  ["multiply", "Modifier Type", "Multiplies the end result"],
                  ["multiple_base", "Multiplies the base"]
                )];
              }
            }
            break;
          }
          case "remove": {
            if (tokens.length === 6) {
              return [new StringOutput("${1:uuid}", "The UUID of the attribute modifier", true, "uuid")];
            }
            break;
          }
          case "value": {
            switch (tokens.length) {
              case 6: {
                return [new StringOutput("get", "Value Mode")];
              }
              case 7: {
                return [new StringOutput("${1:uuid}", "The UUID of the attribute modifier", true, "uuid")];
              }
              case 8: {
                return [(new NumberOutput("scale", "The number to scale the output by", "1")).optional()];
              }
            }
          }
        }
      }
    }
  }

}

module.exports = {
  "1.16": new AttributeCommand
};