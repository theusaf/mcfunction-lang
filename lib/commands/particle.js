const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const particleCommandBuilder12 = new CommandBuilder("particle")
    .setDescription("Creates particle effects.")
    .createNamedSection("GREEDY_PARAMS", (section) => {
      section.addStringOption("params", (opt) => {
        opt.setOptional()
          .setDisplayText("params")
          .setSnippet("${1:params}");
      })
        .addSectionOption((section) => {
          section.addSectionOption("GREEDY_PARAMS");
        });
    })
    .addParticleOption("particle")
    .addCoordinateOption("position", 3, (opt) => {
      opt.setDescription("The location to display the particles at");
    })
    .addCoordinateOption("delta", 3, (opt) => {
      opt.setDefaultValue("1")
        .setDescription("The bounding box particles can appear in. For some particles, this could instead set RGB color values, motion values, or changes in RGB values.");
    })
    .addNumberOption("speed", (opt) => {
      opt.setDescription("The speed of movement of the particles.");
    })
    .addNumberOption("count", (opt) => {
      opt.setDescription("The number of particles to display")
        .setDefaultValue("1")
        .setOptional();
    })
    .addEnumOption("display mode", (opt) => {
      opt.addChoice("force", "Displays blocks up to 512 blocks away.")
        .addChoice("normal", "The default behaviour. Displays particles up to 32 blocks away.")
        .setOptional();
    })
    .addSelectorOption("viewers", (opt) => {
      opt.setDescription("The players that can see the particles")
        .setOptional();
    })
    .addSectionOption("GREEDY_PARAMS"),

  particleCommandBuilder13 = new CommandBuilder("particle")
    .setDescription("Creates particle effects.")
    .addParticleOption("particle")
    .addSectionOption((section) => {
      const token = section.getPreviousToken();
      switch (token) {
        case "item": {
          section.addItemOption("item", (opt) => {
            opt.setDescription("The item particle to display");
          });
          break;
        }
        case "block":
        case "falling_dust": {
          section.addBlockOption("block", (opt) => {
            opt.setDescription("The block particle to display");
          });
          break;
        }
      }
    })
    .addCoordinateOption("position", 3, (opt) => {
      opt.setDescription("The position to render the particles at");
    })
    .addSectionOption((section) => {
      const [, token ] = section.getTokens();
      section.addCoordinateOption("delta", 3, (opt) => {
        switch (token) {
          case "entity_effect":
          case "ambient_entity_effect": {
            opt.setDescription("RGB values from 0.0 to 1.0")
              .setDefaultValue("0.0");
            break;
          }
          case "note": {
            opt.setDescription(stripIndent`
            If \`count\` is set to 0, the first value will represent the color (0.0 --> 1.0)
            Otherwise, this represents a cube position to create particles in.
            `);
            break;
          }
          default: {
            opt.setDescription("The cuboidal area to create particles in");
          }
        }
      });
    })
    .addSectionOption((section) => {
      const [, token ] = section.getTokens();
      section.addNumberOption("speed", (opt) => {
        switch (token) {
          case "entity_effect":
          case "ambient_entity_effect": {
            opt.setDescription("E value (brightness) from 0.0 to 1.0")
              .setDefaultValue("0.0");
            break;
          }
          default: {
            opt.setDescription("The speed of the particle");
          }
        }
      });
    })
    .addNumberOption("count", (opt) => {
      opt.setDescription("Sets the number of particles to create. If set to 0, creates 1 particle and may have other effects.");
    })
    .addEnumOption("display mode", (opt) => {
      opt.addChoice("force", "Displays blocks up to 512 blocks away.")
        .addChoice("normal", "The default behaviour. Displays particles up to 32 blocks away.")
        .setOptional();
    })
    .addSelectorOption("viewers", (opt) => {
      opt.setDescription("The players that can see the particles")
        .setOptional();
    });

module.exports = {
  "1.12": {
    name: "particle",
    builder: particleCommandBuilder12
  },
  "1.13": {
    name: "particle",
    builder: particleCommandBuilder13
  }
};