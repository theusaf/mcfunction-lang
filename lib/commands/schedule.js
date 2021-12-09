const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput"),
  { stripIndent } = require("common-tags");

class ScheduleCommand14 extends BaseCommand {

  constructor() {super("schedule");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("schedule", "Schedules functions to run at a later time.")];
      }
      case 2: {
        return [new EnumOutput(
          ["function", "Sub Command"]
        )];
      }
      case 3: {
        // TODO
        return [new StringOutput("${1:namespace}:${2:name}", "The function to run.", true, "function")];
      }
      case 4: {
        return [
          new StringOutput(
            "${1:time}",
            stripIndent`
            The delay time in days, seconds, or ticks
            To specify the unit, append either 'd', 's', or 't'
            It defaults to 't'. Days are in-game days.
            `,
            true,
            "time"
          )
        ];
      }
    }
  }

}

class ScheduleCommand15 extends ScheduleCommand14 {

  handleSuggestions(tokens) {
    if (tokens.length === 2) {
      const output = super.handleSuggestions(tokens);
      output.push(new EnumOutput(["clear", "Sub Command"]));
      return output;
    }
    if (tokens.length === 4 && tokens[1].getValue() != "function") {
      return;
    }
    if (tokens.length === 5 && tokens[1].getValue() === "function") {
      return [(new EnumOutput(
        ["append", "Mode", "Allow multiple schedules of the function to exist."],
        ["replace", "Mode", "Replace the current function's schedule."]
      )).optional()];
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.14": new ScheduleCommand14,
  "1.15": new ScheduleCommand15
};