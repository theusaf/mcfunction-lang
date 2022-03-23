const CommandBuilder = require("../class/CommandBuilder");

const placeFeatureCommandBuilder = new CommandBuilder("placefeature")
  .setDescription("Places a feature at a specified location.")
  .addFeatureOption("feature")
  .addCoordinateOption("position", 3, (opt) => {
    opt.setOptional();
  });

module.exports = {
  "1.18.2": {
    name: "placefeature",
    builder: placeFeatureCommandBuilder
  }
};