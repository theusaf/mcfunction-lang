const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  ItemOutput = require("../class/output/ItemOutput"),
  LootTableOutput = require("../class/output/LootTableOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  SlotOutput = require("../class/output/SlotOutput");

class LootCommand extends BaseCommand {

  constructor() {super("loot");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("loot", "simulates loot")];
      }
      case 2: {
        return [new EnumOutput(
          ["spawn", "Target Mode", "Spawn item entities"],
          ["replace", "Target Mode", "Replace slots in entities or blocks"],
          ["give", "Target Mode", "Give items to players"],
          ["insert", "Target Mode", "Distributes items in a container block"]
        )];
      }
    }
    const targetMode = tokens[1].getValue();
    let index = tokens.length;
    switch (targetMode) {
      case "insert":
      case "spawn": {
        if (tokens.length <= 5) {
          return [new CoordinateOutput(
            "targetPos",
            "~",
            6 - tokens.length,
            "The position to spawn/insert the items at"
          )];
        }
        index += 3;
        break;
      }
      case "replace": {
        if (tokens.length === 3) {
          return [new EnumOutput(
            ["entity", "Replace Location"],
            ["block", "Replace Location"]
          )];
        }
        const locationChoice = tokens[2].getValue();
        if (locationChoice === "entity") {index += 2;}
        switch (index) {
          case 4:
          case 5: {
            return [new CoordinateOutput(
              "targetPos",
              "~",
              7 - index,
              "The position of the block to replace item slots in"
            )];
          }
          case 6: {
            const out = [];
            if (locationChoice === "entity") {
              out.push(new SelectorOutput("The entities to replace item slots in", "entities"));
            } else if (locationChoice === "block") {
              out.push(new CoordinateOutput(
                "targetPos",
                "~",
                1,
                "The position of the block to replace item slots in"
              ));
            }
            return out;
          }
          case 7: {
            return [new SlotOutput(null, "slot")];
          }
        }
        break;
      }
      case "give": {
        if (tokens.length === 3) {
          return [new SelectorOutput("Players to give the items to", "players")];
        }
        index += 5;
        break;
      }
    }
    if (index > 8 && targetMode === "replace" 
      && (["fish", "loot", "kill", "mine"].includes(tokens[7]?.getValue())
        || ["fish", "loot", "kill", "mine"].includes(tokens[5]?.getValue()))) {
      index++;
    }
    switch (index) {
      case 8:
      case 9: {
        const output = [];
        if (index === 8 && targetMode === "replace") {
          output.push((new NumberOutput("count", "Number of consecutive slots to be filled if the slot selected is filled.")).optional());
        }
        output.push(new EnumOutput(
          ["fish", "Source Mode"],
          ["loot", "Source Mode"],
          ["kill", "Source Mode"],
          ["mine", "Source Mode"]
        ));
        return output;
      }
    }
    const diff = index - tokens.length,
      sourceMode = tokens[8 - diff].getValue();
    switch (sourceMode) {
      case "loot": {
        if (index === 10) {
          return [new LootTableOutput(null, "loot_table")];
        }
        break;
      }
      case "kill": {
        if (index === 10) {
          return [new SelectorOutput("A single target to simulate a kill on", "kill")];
        }
        break;
      }
      case "mine": {
        switch (index) {
          case 10:
          case 11:
          case 12: {
            return [new CoordinateOutput(
              "pos",
              "~",
              13 - index,
              "Position of the block to 'mine'"
            )];
          }
          case 13: {
            return [
              new EnumOutput(
                ["mainhand", "tool"],
                ["offhand", "tool"]
              ),
              new ItemOutput("The item to break the block with", "tool")
            ];
          }
        }
        break;  
      }
      case "fish": {
        switch (index) {
          case 10: {
            return [new LootTableOutput(null, "loot_table")];
          }
          case 11:
          case 12:
          case 13: {
            return [new CoordinateOutput(
              "pos",
              "~",
              14 - index,
              "Position of a block to fish from"
            )];
          }
          case 14: {
            return [
              new EnumOutput(
                ["mainhand", "tool"],
                ["offhand", "tool"]
              ),
              new ItemOutput("The item to fish with", "tool")
            ];
          }
        }
      }
    }
  }

}

module.exports = {
  "1.14": new LootCommand
};  