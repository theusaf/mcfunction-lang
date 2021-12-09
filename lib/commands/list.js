const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput");

class ListCommand12 extends BaseCommand {
  constructor() {super("list");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("list", "Gets the player list. Multiplayer only; Mostly useless in functions.")];
      }
      case 2: {
        return [
          (new StringOutput("uuids", "Show uuids alongside the names.", false, "uuids")).optional()
        ];
      }
    }
  }
}

class ListCommand13 extends ListCommand12 {

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("list", "Gets the player list. Mostly useless in functions.")];
      }
      default: {
        return super.handleSuggestions(tokens);
      }
    }
  }
}

module.exports = {
  "1.12": new ListCommand12,
  "1.13": new ListCommand13
};
