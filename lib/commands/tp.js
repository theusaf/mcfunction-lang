const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder"),
  { NullCommand } = require("../class/builders");

const coordRegex = /^([\^~]|-?[\d.]+|[\^~]-?[\d.]+)$/,

  // TODO: improve this to allow for faster auto complete.

  tpCommandBuilder12 = new CommandBuilder("teleport")
    .setDescription(stripIndent`
  Teleports entities.
  - Coordinates are relative to target's position.
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
    });

module.exports = {
  "1.12": {
    name: "tp",
    builder: tpCommandBuilder12
  },
  "1.13": NullCommand
};