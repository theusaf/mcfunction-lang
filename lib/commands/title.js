const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class TitleCommand extends BaseCommand {
  
  constructor() {super("title");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("title", "Interact with titles and subtitles.")];
      }
      case 2: {
        return [new SelectorOutput("The targets to manage titles/subtitles on", "targets")];
      }
      case 3: {
        return [new EnumOutput(
          ["clear", "Sub Command", "Clears titles for the targets."],
          ["reset", "Sub Command", "Resets the subtitle text for the targets to blank text and default fade times."],
          ["times", "Sub Command", "Modifies title timing."],
          ["title", "Sub Command", "Modifies title text."],
          ["subtitle", "Sub Command", "Modifies subtitle text."],
          ["actionbar", "Sub Command", "Modifies actionbar text."]
        )];
      }
    }
    const subCommand = tokens[2].getValue();
    if (subCommand === "clear" || subCommand === "reset") {return;}
    if (["title", "subtitle", "actionbar"].includes(subCommand)) {
      if (tokens.length === 4) {
        return [new StringOutput(
          "${1:{\"text\":\"my text\"}}",
          "The raw JSON text to display",
          true,
          "title text"
        )];
      }
    } else if (subCommand === "times") {
      switch (tokens.length) {
        case 4: {
          return [new NumberOutput("fadeIn", "The time in ticks for the title to fade in.")];
        }
        case 5: {
          return [new NumberOutput("stay", "The time in ticks for the title to stay on the screen.", "100")];
        }
        case 6: {
          return [new NumberOutput("fadeOut", "The time in ticks for the title to fade out.")];
        }
      }
    }
  }

}

module.exports = {
  "1.12": new TitleCommand
};