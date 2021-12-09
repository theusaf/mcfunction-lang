const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  SoundOutput = require("../class/output/SoundOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class PlaysoundCommand extends BaseCommand {
  constructor() {super("playsound");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("playsound", "Plays sounds.")];
      }
      case 2: {
        return [new SoundOutput(null, "sound")];
      }
      case 3: {
        return [new EnumOutput(
          ["master", "Source"],
          ["music", "Source"],
          ["record", "Source"],
          ["weather", "Source"],
          ["block", "Source"],
          ["hostile", "Source"],
          ["neutral", "Source"],
          ["player", "Source"],
          ["ambient", "Source"],
          ["voice", "Source"]
        )];
      }
      case 4: {
        return [new SelectorOutput(null, "targets")];
      }
      case 5:
      case 6:
      case 7: {
        return [(new CoordinateOutput(["x", "y", "z"].slice(tokens.length - 5).join(" "), "~", 8 - tokens.length, "Position to play the sound at.")).optional()];
      }
      case 8: {
        return [(new NumberOutput("volume", "How loud the sound should play. 0 = 0%, 1 = 100%, etc.", "1")).optional()];
      }
      case 9: {
        return [(new NumberOutput("pitch", "The pitch of the sound. (0.5 - 2.0)", "1")).optional()];
      }
      case 10: {
        return [(new NumberOutput("minVolume", "The volume for targets outside the normal range. (0.0 - 1.0)", "0")).optional()];
      }
    }
  }
}

module.exports = {
  "1.12": new PlaysoundCommand
};
