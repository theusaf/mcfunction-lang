const BaseCommand = require("../class/BaseCommand"),
  EnumOutput = require("../class/output/EnumOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  AdvancementOutput = require("../class/output/AdvancementOutput"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  StringOutput = require("../class/output/StringOutput");

/**
 * advancement <grant, revoke, test> <selector> <advancement> [string]
 */
class AdvancementCommand12 extends BaseCommand {

  constructor() {
    super("advancement");
  }

  handleSuggestions(tokens) {
    if (tokens.length > 2 && !["grant", "revoke", "test"].includes(tokens[1].getValue())) {return;}
    switch (tokens.length) {
      case 1: { // command name
        return [
          new CommandNameOutput("advancement", "Grants, revokes, and tests advancements for a target.")
        ];
      }
      case 2: { // mode
        return [
          new EnumOutput(
            ["grant", "Mode", "Grant an advancement."],
            ["revoke", "Mode", "Revoke an advancement."],
            ["test", "Mode", "Test an advancement."]
          )
        ];
      }
      case 3: { // target
        return [new SelectorOutput(null, "target")];
      }
      case 4: { // advancement
        return [new AdvancementOutput(null, "advancement")];
      }
      case 5: { // specific string
        return [(new StringOutput("${1:criterion}", "The specific section of the advancement to grant", true, "criterion")).optional()];
      }
    }
  }

}

/**
 * advancement <grant, revoke> <selector> everything
 * advancement <grant, revoke> <selector> only <advancement> <criterion>
 * advancement <grant, revoke> <selector> until <advancement>
 * advancement <grant, revoke> <selector> through <advancement>
 * advancement <grant, revoke> <selector> from <advancement>
 */
class AdvancementCommand13 extends BaseCommand {

  constructor() {
    super("advancement");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: { // command name
        return [
          new CommandNameOutput("advancement", "Grants and revokes advancements for a target.")
        ];
      }
      case 2: { // mode
        return [
          new EnumOutput(
            ["grant", "Mode", "Grant an advancement."],
            ["revoke", "Mode", "Revoke an advancement."]
          )
        ];
      }
      case 3: { // target
        return [new SelectorOutput(null, "target")];
      }
      case 4: { // mode2
        return [
          new EnumOutput(
            ["everything", "Mode", "all advancements."],
            ["only", "Mode", "a single advancement."],
            ["from", "Mode", "an advancement and its children."],
            ["until", "Mode", "an advancement and its parents."],
            ["through", "Mode", "an advancement and its children, and its parents, and its parents' children."]
          )
        ];
      }
      case 5: { // advancement
        const mode = tokens[3].getValue();
        if (mode !== "everything") {
          return [new AdvancementOutput(null, "advancement")];
        }
        break;
      }
      case 6: {
        const mode = tokens[3].getValue();
        if (mode === "only") {
          return [new StringOutput("${1:criterion}", "The specific section of the advancement to grant", true)];
        }
      }
    }
  }

}

module.exports = {
  "1.12": new AdvancementCommand12,
  "1.13": new AdvancementCommand13
};
