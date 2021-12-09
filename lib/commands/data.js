const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  NBTOutput = require("../class/output/NBTOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class DataCommand13 extends BaseCommand {

  constructor() {super("data");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("data", "Gets and modifies NBT data.")];
      }
      case 2: {
        return [new EnumOutput(
          ["get", "Sub Command", "Get NBT data"],
          ["merge", "Sub Command", "Merge NBT data"],
          ["remove", "Sub Command", "Removes NBT data"]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    if (tokens.length === 3) {
      return [new EnumOutput(
        ["block", "Target Type"],
        ["entity", "Target Type"]
      )];
    }
    const subCommand2 = tokens[2].getValue();
    let index = tokens.length;
    if (subCommand2 === "entity") {
      index += 2;
    }
    switch (subCommand) {
      case "get": {
        switch (index) {
          case 4:
          case 5:
          case 6: {
            if (index === 6 && subCommand2 === "entity") {
              return [new SelectorOutput("The entity to get the NBT data from", "target")];
            }
            return [new CoordinateOutput(
              ["x", "y", "z"].slice(index - 4),
              "~",
              7 - index,
              "The block position to get NBT data from"
            )];
          }
          case 7: {
            return [(new StringOutput("${1:my.path[0].\"name\"}", "The NBT path to fetch", true, "path")).optional()];
          }
          case 8: {
            return [(new NumberOutput("scale", "The multiplier to scale the returned number", "1")).optional()];
          }
        }
        break;
      }
      case "merge": {
        switch (index) {
          case 4:
          case 5:
          case 6: {
            if (index === 6 && subCommand2 === "entity") {
              return [new SelectorOutput("The entity to get the NBT data from", "target")];
            }
            return [new CoordinateOutput(
              ["x", "y", "z"].slice(index - 4),
              "~",
              7 - index,
              "The block position to get NBT data from"
            )];
          }
          case 7: {
            return [new NBTOutput("nbt", "The NBT data to merge.")];
          }
        }
        break;
      }
      case "remove": {
        switch (index) {
          case 4:
          case 5:
          case 6: {
            if (index === 6 && subCommand2 === "entity") {
              return [new SelectorOutput("The entity to get the NBT data from", "target")];
            }
            return [new CoordinateOutput(
              ["x", "y", "z"].slice(index - 4),
              "~",
              7 - index,
              "The block position to get NBT data from"
            )];
          }
          case 7: {
            return [new StringOutput("${1:my.path[0].\"name\"}", "The NBT path to remove", true, "path")];
          }
        }
      }
    }
  }

}

class DataCommand14 extends DataCommand13 {

  handleSuggestions(tokens) {
    if (tokens.length === 2) {
      const out = super.handleSuggestions(tokens);
      out.push(new EnumOutput(["modify", "Sub Command", "Modifies NBT."]));
      return out;
    }
    const subCommand = tokens[1]?.getValue();
    if (subCommand === "modify") {
      if (tokens.length === 3) {
        return [new EnumOutput(
          ["block", "Modify Target Type"],
          ["entity", "Modify Target Type"]
        )];
      }
      const subCommand2 = tokens[2]?.getValue();
      let index = tokens.length;
      if (subCommand2 === "entity") {
        index += 2;
      }
      switch (index) {
        case 4:
        case 5: {
          if (subCommand2 === "block") {
            return [new CoordinateOutput(
              "targetPos",
              "~",
              7 - index,
              "Position of the block to modify"
            )];
          }
          break;
        }
        case 6: {
          if (subCommand2 === "block") {
            return [new CoordinateOutput(
              "targetPos",
              "~",
              1,
              "Position of the block to modify"
            )];
          } else if (subCommand2 === "entity") {
            return [new SelectorOutput("Single entity to modify.", "target")];
          }
          break;
        }
        case 7: {
          return [new StringOutput("${1:my.path[0].\"to modify\"}", "The NBT path to modify", true, "path")];
        }
        case 8: {
          return [new EnumOutput(
            ["append", "Mode"],
            ["insert", "Mode"],
            ["merge", "Mode"],
            ["prepend", "Mode"],
            ["set", "Mode"]
          )];
        }
      }
      const diff = index - tokens.length,
        subCommand3 = tokens[7 - diff].getValue();
      if (["append", "merge", "prepend", "set"].includes(subCommand3)) {
        index++;
      }
      switch (index) {
        case 9: {
          return [new NumberOutput("index", "The index to insert the NBT data at")];
        }
        case 10: {
          return [new EnumOutput(
            ["from", "Source Mode"],
            ["value", "Source Mode"]
          )];
        }
      }
      const diff2 = index - tokens.length,
        subCommand4 = tokens[9 - diff2].getValue();
      switch (subCommand4) {
        case "from": {
          if (index === 11) {
            return this.getSources();
          }
          const subCommand5 = tokens[10 - diff2].getValue();
          if (subCommand5 === "block") {
            if (index <= 14) {
              return [new CoordinateOutput(
                "sourcePos",
                "~",
                15 - index,
                "The position of the source block"
              )];
            } else if (index === 15) {
              return [(new StringOutput("${1:my.path[0].\"to get\"}", "The NBT source path", true, "path")).optional()];
            }
          } else if (subCommand5 === "entity") {
            if (index === 12) {
              return [new SelectorOutput("The target entity", "target")];
            } else if (index === 13) {
              return [(new StringOutput("${1:my.path[0].\"to get\"}", "The NBT source path", true, "path")).optional()];
            }
          }
          break;
        }
        case "value": {
          return [new NBTOutput("value", "The NBT data/string/number to set")];
        }
      }
    }
    return super.handleSuggestions(tokens);
  }

  getSources() {
    return [new EnumOutput(
      ["block", "Source Type"],
      ["entity", "Source Type"]
    )];
  }

}

class DataCommand15 extends DataCommand14 {

  handleSuggestions(tokens) {
    if (tokens.length === 3) {
      return super.handleSuggestions(tokens).concat([
        new EnumOutput(["storage", "Target Type"])
      ]);
    }
    if (tokens.length > 3 && tokens[2].getValue() === "storage") {
      if (tokens.length === 4) {
        return [new StringOutput("${1:source}", "The source key to store data in", true, "source")];
      }
      tokens.splice(3, 0, null, null);
    }
    const subCommand = tokens[1]?.getValue();
    if (subCommand === "modify") {
      let index = tokens.length;
      if (tokens[2]?.getValue() === "entity" || tokens[2]?.getValue() === "storage") {
        index += 2;
      }
      const diff = index - tokens.length,
        subCommand3 = tokens[7 - diff]?.getValue();
      if (["append", "merge", "prepend", "set"].includes(subCommand3)) {
        index++;
      }
      const diff2 = index - tokens.length,
        subCommand5 = tokens[10 - diff2]?.getValue();
      if (subCommand5 === "storage") {
        if (index === 12) {
          return [new StringOutput("${1:source}", "The source storage key", true, "storage")];
        } else if (index === 13) {
          return [(new StringOutput("${1:my.path[0].\"to get\"}", "The NBT source path", true, "path")).optional()];
        }
      }
    }
    return super.handleSuggestions(tokens);
  }

  getSources() {
    return super.getSources().concat([
      new EnumOutput(["storage", "Source Type"])
    ]);
  }

}

module.exports = {
  "1.13": new DataCommand13,
  "1.14": new DataCommand14,
  "1.15": new DataCommand15
};