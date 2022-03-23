const { CommandBuilder } = require("../class/builders");

const effectCommandBuilder12 = new CommandBuilder("effect")
    .setDescription("Applies status effects to entities.")
    .addSelectorOption("targets")
    .addSubCommand("clear", "sub command", (sub) => {
      sub.setDescription("Clears all status effects from the target entities.");
    })
    .addEffectOption("effect")
    .addNumberOption("seconds", (opt) => {
      opt.setOptional()
        .setDescription("The length in seconds of the status effect duration")
        .setDefaultValue("10")
        .setDisplayText("seconds");
    })
    .addNumberOption("amplifier", (opt) => {
      opt.setOptional()
        .setDescription("The power level of the status effect")
        .setDisplayText("amplifier");
    })
    .addBooleanOption("hideParticles", (opt) => {
      opt.setOptional()
        .setDisplayText("Whether to show status effect particles on the affected entities. By default, particles are shown.");
    }),

  effectCommandBuilder13 = new CommandBuilder("effect")
    .setDescription("Applies status effects to entities.")
    .addSubCommand("clear", "sub command", (sub) => {
      sub.setDescription("Clears status effects from the target entities.")
        .addSelectorOption("targets", (opt) => {
          opt.setOptional();
        })
        .addEffectOption("effect", (opt) => {
          opt.setOptional()
            .setDescription("The effect to clear from the target entities");
        });
    })
    .addSubCommand("give", "sub command", (sub) => {
      sub.setDescription("Gives a status effect to the target entities.")
        .addSelectorOption("targets")
        .addEffectOption("effect")
        .addNumberOption("seconds", (opt) => {
          opt.setOptional()
            .setDescription("The length in seconds of the status effect duration")
            .setDefaultValue("10")
            .setDisplayText("seconds");
        })
        .addNumberOption("amplifier", (opt) => {
          opt.setOptional()
            .setDescription("The power level of the status effect")
            .setDisplayText("amplifier");
        })
        .addBooleanOption("hideParticles", (opt) => {
          opt.setOptional()
            .setDescription("Whether to show status effect particles on the affected entities. By default, particles are shown.");
        });
    });


module.exports = {
  "1.12": {
    name: "effect",
    builder: effectCommandBuilder12
  },
  "1.13": {
    name: "effect",
    builder: effectCommandBuilder13
  }
};