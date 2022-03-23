const CommandBuilder = require("../class/CommandBuilder");

const stopSoundCommandBuilder = new CommandBuilder("stopsound")
  .setDescription("Stops sounds.")
  .addSelectorOption("players", (opt) => {
    opt.setDescription("The players to stop playing the sounds to.");
  })
  .addEnumOption("source", (opt) => {
    opt.addChoice("*", "Stops the sound for all sources.")
      .addChoice("master")
      .addChoice("music")
      .addChoice("record")
      .addChoice("weather")
      .addChoice("block")
      .addChoice("hostile")
      .addChoice("neutral")
      .addChoice("player")
      .addChoice("ambient")
      .addChoice("voice")
      .setOptional();
  })
  .addSoundOption("sound", (opt) => {
    opt.setDescription("The specific sound to stop")
      .setOptional();
  });

module.exports = {
  "1.12": {
    name: "stopsound",
    builder: stopSoundCommandBuilder
  }
};