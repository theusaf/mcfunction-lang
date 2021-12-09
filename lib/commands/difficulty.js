const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput");

/**
 * difficulty <difficulty>
 */
class DefaultGameModeCommand12 extends BaseCommand {
  constructor() {
    super("difficulty");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("difficulty", "Sets the difficulty for the game.")];
      }
      case 2: {
        return [
          new EnumOutput(
            ["peaceful", "difficulty", "Peaceful"],
            ["easy", "difficulty", "Easy"],
            ["normal", "difficulty", "Normal"],
            ["hard", "difficulty", "Hard"],
            ["p", "difficulty", "Peaceful"],
            ["e", "difficulty", "Easy"],
            ["n", "difficulty", "Normal"],
            ["h", "difficulty", "Hard"],
            ["0", "difficulty", "Peaceful"],
            ["1", "difficulty", "Easy"],
            ["2", "difficulty", "Normal"],
            ["3", "difficulty", "Hard"]
          )
        ];
      }
    }
  }
}

/**
 * difficulty <difficulty>
 */
class DefaultGameModeCommand13 extends BaseCommand {
  constructor() {
    super("difficulty");
  }

  handleSuggestions(tokens) {
    switch(tokens.length) {
      case 1: {
        return [new CommandNameOutput("difficulty", "Sets the difficulty for the game.")];
      }
      case 2: {
        return [
          new EnumOutput(
            ["peaceful", "difficulty"],
            ["easy", "difficulty"],
            ["normal", "difficulty"],
            ["hard", "difficulty"]
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
