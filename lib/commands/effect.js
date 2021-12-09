const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  BooleanOutput = require("../class/output/BooleanOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  EffectOutput = require("../class/output/EffectOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class EffectCommand12 extends BaseCommand {
  constructor() {
    super("effect");
  }

  handleSuggestions(tokens) {
    if (tokens.length >= 4) {
      const notEffect = tokens[2].getValue() !== "effect";
      if (notEffect) {
        return [];
      }
    }
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("effect", "Gives potion effects to entities.")];
      }
      case 2: {
        return [new SelectorOutput(null, "targets")];
      }
      case 3: {
        return [
          new StringOutput("clear", "Clears all effects from the target player."),
          new EffectOutput(null, "effect")
        ];
      }
      case 4: {
        return [(new NumberOutput("seconds", "How long the effect should be applied for", "10")).optional()];
      }
      case 5: {
        return [(new NumberOutput("amplifier", "The power level of the potion effect", "0")).optional()];
      }
      case 6: {
        return [(new BooleanOutput("hideParticles", "Whether to hide particles from the effect. By default, particles are shown.")).optional()];
      }
    }
  }
}

class EffectCommand13 extends BaseCommand {

  constructor() {super("effect");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("effect", "Gives and removes status effects.")];
      }
      case 2: {
        return [new EnumOutput(
          ["clear", "Sub Command", "Clear status effects from an entity."],
          ["give", "Sub Command", "Give status effects to an entity."]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "clear": {
        if (tokens.length === 3) {
          return [new SelectorOutput("Entities to clear effects from", "targets")];
        } else if (tokens.length === 4) {
          return [(new EffectOutput("Effect to remove. If omitted, removes all effects.", "effect")).optional()];
        }
        break;
      } 
      case "give": {
        switch (tokens.length) {
          case 3: {
            return [new SelectorOutput("Entities to give effects to", "targets")];
          }
          case 4: {
            return [new EffectOutput("Effect to grant", "effect")];
          }
          case 5: {
            return [(new NumberOutput("seconds", "How long the effect should be applied for", "10")).optional()];
          }
          case 6: {
            return [(new NumberOutput("amplifier", "The power level of the potion effect", "0")).optional()];
          }
          case 7: {
            return [(new BooleanOutput("hideParticles", "Whether to hide particles from the effect. By default, particles are shown.")).optional()];
          }
        }
      }
    }
  }

}

class EffectCommand15 extends EffectCommand13 {
  handleSuggestions(tokens) {
    if (tokens.length === 3 && tokens[1].getValue() === "clear") {
      return [(new SelectorOutput("Entities to clear effects from", "targets")).optional()];
    }
    return super.handleSuggestions(tokens);
  }
}

module.exports = {
  "1.12": new EffectCommand12,
  "1.13": new EffectCommand13,
  "1.15": new EffectCommand15
};
