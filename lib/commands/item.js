const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  SlotOutput = require("../class/output/SlotOutput"),
  StringOutput = require("../class/output/StringOutput"),
  ItemOutput = require("../class/output/ItemOutput"),
  NumberOutput = require("../class/output/NumberOutput");

class ItemCommand extends BaseCommand {

  constructor() {super("item");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("item", "Modifies items")];
      }
      case 2: {
        return [new EnumOutput(
          ["modify", "Sub Command"],
          ["replace", "Sub Command"]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "modify": {
        let index = tokens.length;
        if (index === 3) {
          return [new EnumOutput(
            ["block", "Modify Target"],
            ["entity", "Modify Target"]
          )];
        }
        const subCommand = tokens[2].getValue();
        if (subCommand === "entity") {
          if (index === 4) {
            return [new SelectorOutput("The targets to modify items on", "targets")];
          }
          index += 2;
        } else if (subCommand === "block") {
          if (index <= 6) {
            return [new CoordinateOutput(
              "pos",
              "~",
              7 - index,
              "The block entity's position to modify"
            )];
          } 
        }
        switch (index) {
          case 7: {
            return [new SlotOutput(null, "slot")];
          }
          case 8: {
            return [new StringOutput("${1:modifier}", "The item modifier to apply", true, "modifier")];
          }
        }
        break;
      }
      case "replace": {
        let index = tokens.length;
        if (index === 3) {
          return [new EnumOutput(
            ["block", "Modify Target"],
            ["entity", "Modify Target"]
          )];
        }
        const subCommand = tokens[2].getValue();
        if (subCommand === "entity") {
          if (index === 4) {
            return [new SelectorOutput("The targets to modify items on", "targets")];
          }
          index += 2;
        } else if (subCommand === "block") {
          if (index <= 6) {
            return [new CoordinateOutput(
              "pos",
              "~",
              7 - index,
              "The block entity's position to modify"
            )];
          } 
        }
        if (index === 7) {
          return [new EnumOutput(
            ["with", "Sub Command"],
            ["from", "Sub Command"]
          )];
        }
        const diff = index - tokens.length,
          subCommand2 = tokens[6 - diff].getValue();
        switch (subCommand2) {
          case "with": {
            if (index === 8) {
              return [new ItemOutput(null, "item")];
            } else if (index === 9) {
              return [(new NumberOutput("count", "The number of items to set", "64")).optional()];
            }
            break;
          }
          case "from": {
            if (index === 8) {
              return [new EnumOutput(
                ["block", "From Source"],
                ["entity", "From Source"]
              )];
            }
            const subCommand = tokens[7 - diff].getValue();
            if (subCommand === "entity") {
              if (index === 9) {
                return [new SelectorOutput("The targets to modify items on", "targets")];
              }
              index += 2;
            } else if (subCommand === "block") {
              if (index <= 11) {
                return [new CoordinateOutput(
                  "pos",
                  "~",
                  12 - index,
                  "The block entity's position to modify"
                )];
              } 
            }
            switch (index) {
              case 12: {
                return [new SlotOutput(null, "sourceSlot")];
              }
              case 13: {
                return [(new StringOutput("${1:modifier}", "The item modifier to apply", true, "modifier")).optional()];
              }
            }
          }
        }
      }
    }
  }

}

module.exports = {
  "1.17": new ItemCommand
};