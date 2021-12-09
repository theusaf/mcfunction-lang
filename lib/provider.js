/* global atom */
const ParseLine = require("./util/ParseLine"),
  CommandHandler = require("./util/CommandHandler");

class Provider {

  constructor() {
    this.selector = ".source.mcfunction-lang";
    this.disableForSelector = ".source.mcfunction-lang .comment";
    this.inclusionPriority = 1;
    this.suggestionPriority = 2;
  }

  getSuggestions(options) {
    const {editor, bufferPosition} = options,
      line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]),
      tokens = ParseLine(line);
    if (tokens.length === 0) {
      return;
    }
    const commandTokens = this.getActualCommandLine(tokens),
      isAfterExecuteCommand = this.isAfterExecuteCommand(tokens);
    if (commandTokens.length === 0) {
      return;
    }
    // pass arguments to main command handler.
    return CommandHandler(commandTokens, editor, bufferPosition, isAfterExecuteCommand);
  }

  /**
   * getActualCommandLine - Gets the command line, excluding previous execute statements
   *
   * @return {Token[]} The current command tokens
   */
  getActualCommandLine(tokens) {
    if (tokens.length === 0) {return [];}
    if (tokens[0].getValue() === "execute") {
      if (atom.config.get("mcfunction-lang.version") === "1.12") {
        if (tokens.length < 6) {
          return tokens;
        }
        if (tokens[5].getValue() === "detect") { // e a x y z detect x y z foo bar
          if (tokens.length < 11) {
            return tokens;
          } else {
            return this.getActualCommandLine(tokens.slice(11));
          }
        } else {
          return this.getActualCommandLine(tokens.slice(5));
        }
      } else {
        let i = 1;
        while (i < tokens.length && tokens[i].getValue() !== "run") {
          i++;
        }
        if (tokens[i]) {
          return this.getActualCommandLine(tokens.slice(i + 1));
        } else {
          return tokens;
        }
      }
    } else {
      return tokens;
    }
  }

  /**
   * isAfterExecuteCommand - Determines if the current command is after an execute command.
   *
   * @return {Boolean}
   */
  isAfterExecuteCommand(tokens) {
    return tokens[0].getValue() === "execute";
  }

}

module.exports = Provider;
