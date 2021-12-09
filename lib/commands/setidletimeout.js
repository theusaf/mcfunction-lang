const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput");

class SetIdleTimeoutCommand extends BaseCommand {
  constructor() {super("setidletimeout");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("setidletimeout", "Sets the idle timeout before players are kicked. Multiplayer only; Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [new NumberOutput("minutes")];
      }
    }
  }
}

module.exports = {
  "1.12": new SetIdleTimeoutCommand
};
