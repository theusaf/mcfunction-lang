const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  GameruleOutput = require("../class/output/GameruleOutput"),
  StringOutput = require("../class/output/StringOutput");

class GameRuleCommand extends BaseCommand {
  constructor() {
    super("gamerule");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("gamerule", "Sets game rules.")];
      }
      case 2: {
        return [new GameruleOutput(null, "rule")];
      }
      case 3: {
        return [new StringOutput("${1:value}", "The value to set the game rule to.", true, "value")];
      }
    }
  }

}

module.exports = {
  "1.12": new GameRuleCommand
};
