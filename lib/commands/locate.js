const { CommandBuilder } = require("../class/builders");

const locateCommandBuilder = new CommandBuilder("locate")
  .setDescription("Locates structures in the world.")
  .addStructureOption("structure");

module.exports = {
  "1.12": {
    name: "locate",
    builder: locateCommandBuilder
  }
};