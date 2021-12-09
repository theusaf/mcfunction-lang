const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class TimeCommand12 extends BaseCommand {
  constructor() {super("time");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("time", "Sets the world time.")];
      }
      case 2: {
        return [new EnumOutput(
          ["set", "Sub Command", "Sets the time to a specified time."],
          ["add", "Sub Command", "Adds a number of ticks to the time."],
          ["query", "Sub Command", "Gets certain statistics about the time."]
        )];
      }
      case 3: {
        const subCommand = tokens[1].getValue();
        switch (subCommand) {
          case "set": {
            return [
              new EnumOutput(
                ["day", "value", "Sets the time to 1000."],
                ["night", "value", "Sets the time to 13000."]
              ),
              new NumberOutput("value", "The time (in ticks) to set to.")
            ];
          }
          case "add": {
            return [new NumberOutput("value", "The time (in ticks) to add.")];
          }
          case "query": {
            return [new EnumOutput(
              ["day", "Type", "Get the current date/day. This is the number of in-game days that have passed."],
              ["daytime", "Type", "Get the current day time (in ticks)."],
              ["gametime", "Type", "Get the number of ticks that the world has been ticking."]
            )];
          }
        }
      }
    }
  }

}

class TimeCommand13 extends TimeCommand12 {
  
  handleSuggestions(tokens) {
    if (tokens.length === 3 && tokens[1].getValue() === "set") {
      const output = super.handleSuggestions(tokens);
      output.splice(0, 0, new EnumOutput(
        ["noon", "value", "Sets the time to 6000."],
        ["midnight", "value", "Sets the time to 18000."]
      ));
      return output;
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new TimeCommand12,
  "1.13": new TimeCommand13
};
