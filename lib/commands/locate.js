const { CommandBuilder } = require("../class/builders");

const locateCommandBuilder12 = new CommandBuilder("locate")
    .setDescription("Locates structures in the world.")
    .addStructureOption("structure"),

  locateCommandBuilder18_2 = new CommandBuilder("locate")
    .setDescription("Locates structures in the world.")
    .addStructureOption("structure", (opt) => {
      opt.includeTags();
    });

module.exports = {
  "1.12": {
    name: "locate",
    builder: locateCommandBuilder12
  },
  "1.18.2": {
    name: "locate",
    builder: locateCommandBuilder18_2
  }
};