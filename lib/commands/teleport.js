const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const coordRegex = /^([\^~]|-?[\d.]+|[\^~]-?[\d.]+)$/,

  // TODO: improve this to allow for faster auto complete.

  teleportCommandBuilder12 = new CommandBuilder("teleport")
    .setDescription(stripIndent`
  Teleports entities.
  - Coordinates are relative to command's execution position.
  `)
    .addSelectorOption("targets", (opt) => {
      opt.setDescription("The destination entity(s)")
        .setParallel();
    })
    .addCoordinateOption("destination", 1)
    .addSectionOption((section) => {
      const [, token ] = section.getTokens();
      if (coordRegex.test(token)) {
      // coordinate!
        section.addCoordinateOption("destination", 2)
          .addCoordinateOption("rotation", 2, (opt) => {
            opt.setOptional();
          });
      } else {
      // Selector
        section.addSelectorOption("targets", (opt) => {
          opt.setDescription(stripIndent`
        The destination entity
        - The first targets will be the entities being teleported.
        `)
            .setParallel();
        })
          .addCoordinateOption("destination", 1)
          .addSectionOption((section) => {
            const token = section.getTokens()[2];
            if (coordRegex.test(token)) {
              section.addCoordinateOption("destination", 2)
                .addCoordinateOption("rotation", 2, (opt) => {
                  opt.setOptional();
                });
            }
          });
      }
    }),

  teleportCommandBuilder13 = new CommandBuilder("teleport")
    .setDescription("Teleports entities.")
    .addAlias("tp")
    .addSelectorOption("targets", (opt) => {
      opt.setDescription("The destination entity(s)")
        .setParallel();
    })
    .addCoordinateOption("destination", 1)
    .addSectionOption((section) => {
      const [, token ] = section.getTokens();
      if (coordRegex.test(token)) {
        // coordinate!
        section.addCoordinateOption("destination", 2)
          .addCoordinateOption("rotation", 2, (opt) => {
            opt.setOptional();
          });
      } else {
        // Selector
        section.addSelectorOption("targets", (opt) => {
          opt.setDescription(stripIndent`
        The destination entity
        - The first targets will be the entities being teleported.
        `)
            .setParallel();
        })
          .addCoordinateOption("destination", 1)
          .addSectionOption((section) => {
            const token = section.getTokens()[2];
            if (coordRegex.test(token)) {
              section.addCoordinateOption("destination", 2)
                .addSubCommand("facing", (sub) => {
                  sub.setDescription("Specifies a location or entity to face.")
                    .setOptional()
                    .addSubCommand("entity", (sub) => {
                      sub.setDescription("Specifies a target entity to face.")
                        .addSelectorOption("facing entity", (opt) => {
                          opt.setDescription("The target entity to face.");
                        });
                    })
                    .addCoordinateOption("target", 3, (opt) => {
                      opt.setDescription("The location to face.");
                    });
                })
                .addCoordinateOption("rotation", 2, (opt) => {
                  opt.setOptional();
                });
            }
          });
      }
    });


module.exports = {
  "1.12": {
    name: "teleport",
    builder: teleportCommandBuilder12
  },
  "1.13": {
    name: [ "tp", "teleport" ],
    builder: teleportCommandBuilder13
  }
};