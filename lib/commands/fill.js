const { CommandBuilder } = require("../class/builders");

const fillCommandBuilder12 = new CommandBuilder("fill")
    .setDescription("Fills an area with blocks.")
    .addCoordinateOption("corner 1", 3)
    .addCoordinateOption("corner 2", 3)
    .addBlockOption("block")
    .addStringOption("state", (opt) => {
      opt.setDescription("The block state or variant to fill with")
        .setOptional()
        .setDisplayText("state")
        .setSnippet("${1:state}");
    })
    .addEnumOption("fill mode", (opt) => {
      opt.addChoice("destroy", "Destroys the blocks in the filled area before filling.")
        .addChoice("hollow", "Replaces the outer edges of the fill region. Inner areas are replaced with air.")
        .addChoice("keep", "Replaces only air with the specified block.")
        .addChoice("outline", "Replaces blocks on the outer edges of the fill region. Inner areas are not affected.")
        .addChoice("replace", "Replaces all blocks with the specified block.");
    })
    .addNBTOption("dataTag", (opt) => {
      opt.setOptional()
        .setDescription("The NBT data to be applied to the filled blocks")
        .setDisplayText("NBT data");
    }),

  fillCommandBuilder13 = new CommandBuilder("fill")
    .setDescription("Fills an area with blocks.")
    .addCoordinateOption("corner 1", 3)
    .addCoordinateOption("corner 2", 3)
    .addBlockOption("block")
    .addEnumOption("fill mode", (opt) => {
      opt.addChoice("destroy", "Destroys the blocks in the filled area before filling.")
        .addChoice("hollow", "Replaces the outer edges of the fill region. Inner areas are replaced with air.")
        .addChoice("keep", "Replaces only air with the specified block.")
        .addChoice("outline", "Replaces blocks on the outer edges of the fill region. Inner areas are not affected.")
        .addChoice("replace", "Replaces all blocks with the specified block.");
    })
    .addSectionOption((section) => {
      if (section.getPreviousToken() === "replace") {
        section.addBlockOption("filter", (opt) => {
          opt.setOptional()
            .setDescription("The block used to filter what gets replaced");
        });
      }
    });

module.exports = {
  "1.12": {
    name: "fill",
    builder: fillCommandBuilder12
  },
  "1.13": {
    name: "fill",
    builder: fillCommandBuilder13
  }
};