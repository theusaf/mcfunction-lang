const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class BanlistCommand extends BaseCommand {
  constructor() {super("banlist");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("banlist", "Gets the ban list. Multiplayer only; Must set 'function-permission-level=3' or higher; Mostly useless in functions.")];
      }
      case 2: {
        return [
          (new EnumOutput(
            ["ips", "type"],
            ["players", "type"]
          )).optional()
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new BanlistCommand
};
