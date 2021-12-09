const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput");

class DebugCommand12 extends BaseCommand {
  constructor() {super("debug");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("debug", "Starts/Stops debug sessions. Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [
          (new EnumOutput(
            ["start", "action", "Starts a new debug time profiler session."],
            ["stop", "action", "Stops the active debug time profiler session."]
          )).optional()
        ];
      }
    }
  }
}

class DebugCommand17 extends DebugCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length === 2) {
      return [new EnumOutput(
        ["start", "action", "Starts a new debug time profiler session."],
        ["stop", "action", "Stops the active debug time profiler session."],
        ["function", "action", "Gets debug information about functions."]
      )];
    }
    if (tokens.length === 3 && tokens[1].getValue() === "function") {
      // TODO
      return [new StringOutput("${1:name}", "The function to debug", true, "name")];
    }
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new DebugCommand12,
  "1.17": new DebugCommand17
};
