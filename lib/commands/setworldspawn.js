const CommandBuilder = require("../class/CommandBuilder");

const setWorldSpawnCommandBuilder = new CommandBuilder("setworldspawn")
  .setDescription("Sets the world spawn.")
  .addCoordinateOption("position", 3)
  .addCoordinateOption("angle", 2, (opt) => {
    opt.setDescription("The yaw/pitch angle in which players should spawn in facing.")
      .setOptional();
  });

module.exports = {
  "1.12": {
    name: "setworldspawn",
    builder: setWorldSpawnCommandBuilder
  }
};