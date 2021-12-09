const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  StringOutput = require("../class/output/StringOutput"),
  BlockOutput = require("../class/output/BlockOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  DimensionOutput = require("../class/output/DimensionOutput");

class ExecuteCommand12 extends BaseCommand {
  constructor() {
    super("execute");
  }

  handleSuggestions(tokens) {
    if (tokens.length > 6 && tokens[5].getValue() !== "detect") {
      return;
    }
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("execute", "Execute commands as entities in certain locations.")];
      }
      case 2: {
        return [new SelectorOutput("The targets to run the command as.", "targets")];
      }
      case 3:
      case 4:
      case 5: {
        return [
          new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 3), "~", 6 - tokens.length, "Position relative to target entity to execute the command."),
          new StringOutput("${1:~} ${2:~} ${3:~} detect", "(...with block detection)", true, "x y z detect")
        ];
      }
      case 6: {
        return [new StringOutput("detect")];
      }
      case 7:
      case 8:
      case 9: {
        return [new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 7), "~", 10 - tokens.length, "Position relative to previous location to check the block.")];
      }
      case 10: {
        return [new BlockOutput("The block id to detect.", "block")];
      }
      case 11: {
        return [
          new StringOutput("${1:state}", "The data value, or block state to check for. -1 and * are also valid.", true, "state")
        ];
      }
    }
  }
}

class ExecuteCommand13 extends BaseCommand {
  constructor() {super("execute");}

  handleSuggestions(tokens) {
    if (tokens.length === 1) {
      return [new CommandNameOutput("execute", "Execute commands as entities in certain locations and criteria.")];
    }
    const currentSubCommand = [];
    // Get current execute sub command
    for (let i = 1; i < tokens.length; i++) {
      currentSubCommand.push(tokens[i]);
      const isDone = this.isSubCommandDone(currentSubCommand);
      if (isDone) {
        if (isDone === 1) {
          currentSubCommand.splice(0, currentSubCommand.length - 1);
        } else {
          currentSubCommand.splice(0);
        }
      }
    }
    if (currentSubCommand.length <= 1) {
      return [new EnumOutput(
        ["align", "Modification Sub Command", "Updates execute position aligning it to the block position (flooring)."],
        ["anchored", "Modificaiton Sub Command", "Sets execute anchor to eyes/feet."],
        ["as", "Modification Sub Command", "Sets the command's executor(s)."],
        ["at", "Modification Sub Command", "Sets the command's position/rotation/dimension to match that of an entity."],
        ["facing", "Modification Sub Command", "Sets the exeuction rotation to face a point from the anchor."],
        ["in", "Modification Sub Command", "Sets the execution dimension/position."],
        ["positioned", "Modification Sub Command", "Sets the execute position."],
        ["rotated", "Modification Sub Command", "Sets the execution rotation."],
        ["if", "Conditional Sub Command", "Runs if the condition is true."],
        ["unless", "Conditional Sub Command", "Runs if the condition is false."],
        ["store", "Store Sub Command", "Stores the result somewhere."],
        ["run", "Execution Sub Command", "End the execute command, run a different command."]
      )];
    }
    const subCommand = currentSubCommand[0].getValue();
    switch (subCommand) {
      case "align": {
        if (currentSubCommand.length === 2) {
          return [new EnumOutput(
            ["x", "axes"],
            ["y", "axes"],
            ["z", "axes"],
            ["xy", "axes"],
            ["xz", "axes"],
            ["yz", "axes"],
            ["xyz", "axes"]
          )];
        }
        break;
      }
      case "anchored": {
        if (currentSubCommand.length === 2) {
          return [new EnumOutput(
            ["eyes", "anchor"],
            ["feet", "anchor"]
          )];
        }
        break;
      }
      case "at":
      case "as": {
        if (currentSubCommand.length === 2) {
          return [new SelectorOutput("Entities to run the command as/at", "targets")];
        }
        break;
      }
      case "in": {
        if (currentSubCommand.length === 2) {
          return [new DimensionOutput];
        }
        break;
      }
      case "positioned": {
        if (currentSubCommand.length === 2) {
          return [
            new StringOutput("as", "Position as an entity"),
            new CoordinateOutput("x y z", "~", 3, "Coordinate to position at")
          ];
        } else if (currentSubCommand.length > 2) {
          if (currentSubCommand[1].getValue() === "as") {
            return [new SelectorOutput("Target entities to position as", "targets")];
          } else {
            return [new CoordinateOutput(
              ["y", "z"].slice(currentSubCommand.length - 3),
              "~",
              5 - currentSubCommand.length,
              "Coordinate to position at"
            )];
          }
        }
        break;
      }
      case "rotated": {
        if (currentSubCommand.length === 2) {
          return [
            new StringOutput("as", "Position as an entity"),
            new CoordinateOutput("x z", "~", 2, "Coordinate to position at")
          ];
        } else if (currentSubCommand.length > 2) {
          if (currentSubCommand[1].getValue() === "as") {
            return [new SelectorOutput("Target entities to position as", "targets")];
          } else {
            return [new CoordinateOutput(
              ["z"].slice(currentSubCommand.length - 3),
              "~",
              4 - currentSubCommand.length,
              "Coordinate to position at"
            )];
          }
        }
        break;
      }
      case "facing": {
        if (currentSubCommand.length === 2) {
          return [
            new StringOutput("entity", "Face towards an entity"),
            new CoordinateOutput("x y z", "~", 3, "Coordinate to face towards")
          ];
        } else if (currentSubCommand.length > 2) {
          if (currentSubCommand[1].getValue() === "entity") {
            return [new SelectorOutput("Target entities to face towards", "targets")];
          } else {
            return [new CoordinateOutput(
              ["y", "z"].slice(currentSubCommand.length - 3),
              "~",
              5 - currentSubCommand.length,
              "Coordinate to face towards"
            )];
          }
        }
        break;
      }
      case "if":
      case "unless": {
        return this.ifUnlessOutput(currentSubCommand);
      }
      case "store": {
        return this.storeOutput(currentSubCommand);
      }
    }
  }

  storeOutputChoices() {
    return [new EnumOutput(
      ["block", "Mode Location", "Store in a block"],
      ["bossbar", "Mode Location", "Store in a bossbar"],
      ["entity", "Mode Location", "Store in an entity"],
      ["score", "Mode Location", "Store in a scoreboard objective"]
    )];
  }

  /**
   * storeOutput - Gets the store output
   *
   * @param {Token[]} command The list of subcommand tokens
   * @return {Output[]} The output options
   */
  storeOutput(command) {
    if (command.length === 2) {
      return [new EnumOutput(
        ["result", "Mode", "Stores the result output"],
        ["sucess", "Mode", "Stores the success number output"]
      )];
    } else if (command.length === 3) {
      return this.storeOutputChoices();
    }
    const storeSub = command[2].getValue();
    return this.storePaths(storeSub, command);
  }

  storePaths(storeSub, command) {
    switch (storeSub) {
      case "block": {
        switch (command.length) {
          case 4:
          case 5:
          case 6: {
            return [new CoordinateOutput(
              ["x", "y", "z"].slice(command.length - 4).join(" "),
              "~",
              7 - command.length,
              "The block to store data in"
            )];
          }
          case 7: {
            return [new StringOutput("${1:path.to.store[0].\"in\"}", "The path to store the result in", true, "path")];
          }
          case 8: {
            return [new EnumOutput(
              ["byte", "Value Type"],
              ["short", "Value Type"],
              ["int", "Value Type"],
              ["long", "Value Type"],
              ["Float", "Value Type"],
              ["double", "Value Type"]
            )];
          }
          case 9: {
            return [new NumberOutput("scale", "The multiplier to apply before storing", "1")];
          }
        }
        break;
      }
      case "bossbar": {
        if (command.length === 4) {
          return [new StringOutput("${1:bossbar_id}", "The ID of the bossbar to save the value in", true, "id")];
        } else if (command.length === 5) {
          return [new EnumOutput(
            ["value", "Bossbar Location", "Store in bossbar's value"],
            ["max", "Bossbar Location", "Store in bossbar's max value"]
          )];
        }
        break;
      }
      case "entity": {
        switch (command.length) {
          case 4: {
            return [new SelectorOutput("The single entity to store in", "target")];
          }
          case 5: {
            return [new StringOutput("${1:path.to.store[0].\"in\"}", "The path to store the result in", true, "path")];
          }
          case 6: {
            return [new EnumOutput(
              ["byte", "Value Type"],
              ["short", "Value Type"],
              ["int", "Value Type"],
              ["long", "Value Type"],
              ["Float", "Value Type"],
              ["double", "Value Type"]
            )];
          }
          case 7: {
            return [new NumberOutput("scale", "The multiplier to apply before storing", "1")];
          }
        }
        break;
      }
      case "score": {
        if (command.length === 4) {
          return [new SelectorOutput("Score holders to overwrite scores in", "targets")];
        } else if (command.length === 5) {
          return [new StringOutput("${1:objective}", "The objective to store the scores in", true, "objective")];
        }
      }
    }
  }

  /**
   * ifUnlessOutput - Gets the if/unless output
   *
   * @param {Token[]} command The list of subcommand tokens
   * @return {Output[]} The output options
   */
  ifUnlessOutput(command) {
    if (command.length === 2) {
      return [new EnumOutput(
        ["block", "If/Unless Sub Check Type", "Checks for a single block"],
        ["blocks", "If/Unless Sub Check Type", "Checks for a selection of blocks"],
        ["entity", "If/Unless Sub Check Type", "Checks for one or more entities"],
        ["score", "If/Unless Sub Check Type", "Checks for a matching score"]
      )];
    }
    const ifSub = command[1].getValue();
    switch (ifSub) {
      case "block": {
        if (command.length <= 5) {
          return [new CoordinateOutput(
            ["x", "y", "z"].slice(command.length - 3).join(" "),
            "~",
            6 - command.length,
            "Position to check the block"
          )];
        } else if (command.length == 6) {
          return [new BlockOutput("Block to check", "block")];
        }
        break;
      }
      case "blocks": {
        if (command.length <= 5) {
          return [new CoordinateOutput(
            ["x1", "y1", "z1"].slice(command.length - 3).join(" "),
            "~",
            6 - command.length,
            "Start position to match the blocks"
          )];
        } else if (command.length <= 8) {
          return [new CoordinateOutput(
            ["x2", "y2", "z2"].slice(command.length - 6).join(" "),
            "~",
            9 - command.length,
            "End position to match the blocks"
          )];
        } else if (command.length <= 11) {
          return [new CoordinateOutput(
            ["x", "y", "z"].slice(command.length - 9).join(" "),
            "~",
            12 - command.length,
            "Position to check the blocks"
          )];
        } else if (command.length === 12) {
          return [new EnumOutput(
            ["all", "Scan Mode", "Include all blocks in the check"],
            ["masked", "Scan Mode", "Ignore air blocks in the check"]
          )];
        }
        break;
      }
      case "entity": {
        if (command.length === 3) {
          return [new SelectorOutput("Target(s) to check for", "targets")];
        }
        break;
      }
      case "score": {
        switch (command.length) {
          case 3: {
            return [new SelectorOutput("A single target to check", "target")];
          }
          case 4: {
            return [new StringOutput("${1:targetObjective}", "The objective to check the scores in", true, "targetObjective")];
          }
          case 5: {
            return [new EnumOutput(
              ["matches", "If Score Comparision", "Specify a range"],
              ["<", "If Score Comparison", "Less than"],
              ["<=", "If Score Comparison", "Less than or equal to"],
              ["=", "If Score Comparision", "Equal to"],
              [">=", "If Score Comparison", "Greater than or equal to"],
              [">", "If Score Comparison", "Greater than"]
            )];
          }
        }
        const scoreSub = command[4].getValue();
        if (scoreSub === "matches") {
          return [new StringOutput("${1:0..10}", "The range of values to check", true, "range")];
        } else if (["<", "<=", "=", ">=", ">"].includes(scoreSub)) {
          if (command.length === 6) {
            return [new SelectorOutput("A single source to get from", "source")];
          } else if (command.length === 7) {
            return [new StringOutput("${1:sourceObjective}", "The objective to compare the scores with", true, "sourceObjective")];
          }
        }
        break;
      }
    }
  }

  /**
   * isSubCommandDone - Determines whether a sub command has completed.
   *
   * @param {Token[]} command
   * @return {Boolean|Number} Whether the sub command is complete.
   */
  isSubCommandDone(command) {
    const [type] = command;
    switch (type.getValue()) {
      case "align": {
        return [
          "x",
          "y",
          "z",
          "xz",
          "xy",
          "yx",
          "yz",
          "zx",
          "zy",
          "xyz",
          "xzy",
          "yxz",
          "yzx",
          "zxy",
          "zyx"
        ].includes(command[1]?.getValue());
      }
      case "anchored": {
        return ["eyes", "feet"].includes(command[1]?.getValue());
      }
      case "at":
      case "in":
      case "as": {
        return command.length > 2 ? 1 : false;
      }
      case "facing": {
        if (command[1]?.getValue() === "entity") {
          return command.length === 3
            && ["eyes", "feet"].includes(command[2]?.getValue());
        } else {
          return command.length > 4 ? 1 : false;
        }
      }
      case "positioned": {
        if (command[1]?.getValue() === "as") {
          return command.length > 3 ? 1 : false;
        } else {
          return command.length > 4 ? 1 : false;
        }
      }
      case "rotated": {
        return command.length > 3 ? 1 : false;
      }
      case "if":
      case "unless": {
        return this.ifUnlessDone(command);
      }
      case "store": {
        return this.storeDone(command);
      }
      default: {return false;}
    }
  }

  /**
   * storeDone - Checks for the store sub command
   *
   * @param {Token[]} command The subcommand tokens
   * @return {Boolean|Number} Whether the command is done
   */
  storeDone(command) {
    const [,,storeSub] = command;
    switch (storeSub?.getValue()) {
      case "block": {
        return command.length > 9 ? 1 : false;
      }
      case "bossbar": {
        return command.length === 5
          && ["value", "max"].includes(command[4]?.getValue());
      }
      case "entity": {
        return command.length > 7 ? 1 : false;
      }
      case "score": {
        return command.length > 5 ? 1 : false;
      }
      default: {return false;}
    }
  }

  /**
   * ifUnlessDone - Checks for the if/unless conditionals
   *
   * @param {Token[]} command The subcommand tokens
   * @return {Boolean|Number} Whether the command is done
   */
  ifUnlessDone(command) {
    const [,subcommand] = command;
    switch (subcommand?.getValue()) {
      case "block": {
        return command.length > 6 ? 1 : false;
      }
      case "blocks": {
        return command.length === 12
          && ["all", "masked"].includes(command[11].getValue());
      }
      case "entity": {
        return command.length > 3 ? 1 : false;
      }
      case "score": {
        const ifSub = command[4];
        if (ifSub?.getValue() === "matches") {
          return command.length > 6 ? 1 : false;
        } else {
          return command.length > 7 ? 1 : false;
        }
      }
      default: {return false;}
    }
  }

}

class ExecuteCommand15 extends ExecuteCommand13 {

  storeOutputChoices() {
    return super.storeOutputChoices().concat([new EnumOutput(
      ["storage", "Mode Location", "Store in storage"]
    )]);
  }

  storeDone(command) {
    const [,,storeSub] = command;
    if (storeSub?.getValue() === "storage") {
      return command.length > 7 ? 1 : false;
    }
    return super.storeDone(command);
  }

  storePaths(storeSub, command) {
    if (storeSub === "storage") {
      if (command.length === 4) {
        return [new StringOutput("${1:storage}", "The storage key to store the result in", true, "storage")];
      } else {
        return super.storePaths("entity", command);
      }
    }
    return super.storePaths(storeSub, command);
  }

}

module.exports = {
  "1.12": new ExecuteCommand12,
  "1.13": new ExecuteCommand13,
  "1.15": new ExecuteCommand15
};
