/*
  eslint-disable no-unused-vars
*/

/**
 * The base class of commands
 */
class BaseCommand {

  constructor(name) {
    this.name = name;
  }

  /**
   * handleSuggestions - Handles suggestions
   *
   * @param  {Token[]}        tokens                The list of tokens (of the current command)
   * @param  {Editor}         editor                The editor object
   * @param  {BufferPosition} bufferPosition        The position of the cursor
   * @param  {Boolean}        isAfterExecuteCommand Whether command follows an execute command
   * @return {Output[]}                             The output
   */
  handleSuggestions(tokens, editor, bufferPosition, isAfterExecuteCommand) {
    return [];
  }

}

module.exports = BaseCommand;
