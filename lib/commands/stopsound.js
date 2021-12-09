const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  SoundOutput = require("../class/output/SoundOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class StopsoundCommand extends BaseCommand {
  constructor() {super("stopsound");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("stopsound", "Stops sounds.")];
      }
      case 2: {
        return [new SelectorOutput("The players to stop playing the sounds to.", "targets")];
      }
      case 3: {
        return [(new EnumOutput(
          ["*", "source", "The source of the sound to stop."],
          ["master", "source", "The source of the sound to stop."],
          ["music", "source", "The source of the sound to stop."],
          ["record", "source", "The source of the sound to stop."],
          ["weather", "source", "The source of the sound to stop."],
          ["block", "source", "The source of the sound to stop."],
          ["hostile", "source", "The source of the sound to stop."],
          ["neutral", "source", "The source of the sound to stop."],
          ["player", "source", "The source of the sound to stop."],
          ["ambient", "source", "The source of the sound to stop."],
          ["voice", "source", "The source of the sound to stop."]
        )).optional()];
      }
      case 4: {
        return [(new SoundOutput(null, "source")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new StopsoundCommand
};
