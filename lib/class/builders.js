const CommandBuilder = require("./CommandBuilder");

class NullCommandBuilder extends CommandBuilder {

  reformatOutput() {
    return [];
  }

}

const NullCommand = {
  name: "__null__",
  builder: new NullCommandBuilder("__null__")
};

module.exports = {
  CommandBuilder,
  NullCommand
};
