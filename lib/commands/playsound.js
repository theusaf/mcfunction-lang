const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const playSoundCommandBuilder = new CommandBuilder("playsound")
  .setDescription("Plays sounds.")
  .addSoundOption("sound")
  .addEnumOption("source", (opt) => {
    opt.addChoice("master")
      .addChoice("music")
      .addChoice("record")
      .addChoice("weather")
      .addChoice("block")
      .addChoice("hostile")
      .addChoice("neutral")
      .addChoice("player")
      .addChoice("ambient")
      .addChoice("voice");
  })
  .addSelectorOption("targets", (opt) => {
    opt.setDescription("The players to play the sound to");
  })
  .addCoordinateOption("position", 3, (opt) => {
    opt.setDescription("The position to play the sound at")
      .setOptional();
  })
  .addNumberOption("volume", (opt) => {
    opt.setDefaultValue("1")
      .setOptional()
      .setDescription(stripIndent`
      The volume (percent) of the sound
      - 0 = 0%
      - 1 = 100%
      - 2 = 200%
      ...
      `);
  })
  .addNumberOption("pitch", (opt) => {
    opt.setDefaultValue("1")
      .setOptional()
      .setDescription(stripIndent`
      The pitch of the sound
      - Valid values are from 0.5 --> 2.0
      `);
  })
  .addNumberOption("minimum volume", (opt) => {
    opt.setOptional()
      .setDescription(stripIndent`
      The volume for players outside of the normal range
      - Valid values are from 0.0 --> 1.0
      `);
  });

module.exports = {
  "1.12": {
    name: "playsound",
    builder: playSoundCommandBuilder
  }
};