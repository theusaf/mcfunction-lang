const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class WhitelistCommand extends BaseCommand {
  constructor() {super("whitelist");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("whitelist", "Whitelists players. Multiplayer only; Must set 'function-permission-level=3' or higher.")];
      }
      case 2: {
        return [new EnumOutput(
          ["add", "Sub Command", "Add players to the whitelist"],
          ["list", "Sub Command", "List the players in the whitelist"],
          ["off", "Sub Command", "Disable the whitelist"],
          ["on", "Sub Command", "Enable the whitelist"],
          ["reload", "Sub Command", "Reload the whitelist data from the JSON file"],
          ["remove", "Sub Command", "Remove players from the whitelist"]
        )];
      }
      case 3: {
        const subCommand = tokens[1].getValue();
        if (["add", "remove"].includes(subCommand)) {
          return [new SelectorOutput("The players to add/remove from the whitelist", "targets")];
        }
      }
    }
  }
}

module.exports = {
  "1.12": new WhitelistCommand
};