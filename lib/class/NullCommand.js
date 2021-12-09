const BaseCommand = require("./BaseCommand");

class NullCommand extends BaseCommand {
  constructor() {
    super("_null");
  }
}

module.exports = NullCommand;
