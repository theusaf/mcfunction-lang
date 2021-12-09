const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  SelectorOutput = require("../class/output/SelectorOutput");

class KillCommand12 extends BaseCommand {
  constructor() {
    super("kill");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("kill", "Kills entities")];
      }
      case 2: {
        return [(new SelectorOutput(null, "targets")).optional()];
      }
    }
  }
}

class KillCommand13 extends KillCommand12 {

  handleSuggestions(tokens) {
    if (tokens.length === 2) {
      return [new SelectorOutput(null, "targets")];
    }
    return super.handleSuggestions(tokens);
  }
}

module.exports = {
  "1.12": new KillCommand12,
  "1.13": new KillCommand13,
  get "1.15"() {
    return module.exports["1.12"];
  }
};
