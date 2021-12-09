const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput");

/**
 * defaultgamemode <mode>
 */
class DefaultGameModeCommand12 extends BaseCommand {
  constructor() {
    super("defaultgamemode");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("defaultgamemode", "Sets the default game mode.")];
      }
      case 2: {
        return [
          new EnumOutput(
            ["creative", "game mode", "Flight, building, and invulnerability"],
            ["survival", "game mode", "Resource gathering, crafting, mining, and survival"],
            ["spectator", "game mode", "Flight, noclip, viewing"],
            ["adventure", "game mode", "Survival, no griefing"],
            ["c", "game mode", "Flight, building, and invulnerability"],
            ["s", "game mode", "Resource gathering, crafting, mining, and survival"],
            ["sp", "game mode", "Flight, noclip, viewing"],
            ["a", "game mode", "Survival, no griefing"],
            ["1", "game mode", "Flight, building, and invulnerability"],
            ["0", "game mode", "Resource gathering, crafting, mining, and survival"],
            ["3", "game mode", "Flight, noclip, viewing"],
            ["2", "game mode", "Survival, no griefing"]
          )
        ];
      }
    }
  }
}

/**
 * defaultgamemode <mode>
 */
class DefaultGameModeCommand13 extends BaseCommand {
  constructor() {
    super("defaultgamemode");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("defaultgamemode", "Sets the default game mode.")];
      }
      case 2: {
        return [
          new EnumOutput(
            ["creative", "game mode", "Flight, building, and invulnerability"],
            ["survival", "game mode", "Resource gathering, crafting, mining, and survival"],
            ["spectator", "game mode", "Flight, noclip, viewing"],
            ["adventure", "game mode", "Survival, no griefing"]
          )
        ];
      }
    }
  }
}

module.exports = {
  "1.12": new DefaultGameModeCommand12,
  "1.13": new DefaultGameModeCommand13
};
