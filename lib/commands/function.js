const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  fs = require("fs").promises,
  path = require("path");

class FunctionCommand12 extends BaseCommand {
  constructor() {
    super("function");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("function", "Run functions from datapacks.")];
      }
      case 2: {
      // TODO: read fs and get the names!
      // See also: schedule.js
        return [new StringOutput("${1:namespace}:${2:name}", "The function to run.", true, "name")];
      }
      case 3: {
        return [
          (new EnumOutput(
            ["if", "Entity Conditional", "Will run if the entity listed matches."],
            ["unless", "Entity Conditional", "Will run if there are no matches."]
          )).optional()
        ];
      }
      case 4: {
        const value = tokens[2].getValue();
        if (value === "if" || value === "unless") {
          return [new SelectorOutput];
        }
      }
    }
  }

}

class FunctionCommand13 extends FunctionCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length > 2) {return;}
    return super.handleSuggestions(tokens);
  }

}

module.exports = {
  "1.12": new FunctionCommand12,
  "1.13": new FunctionCommand13
};
