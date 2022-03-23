const CommandBuilder = require("../class/CommandBuilder");

const weatherCommandBuilder = new CommandBuilder("weather")
  .setDescription("Changes the weather in the world.")
  .addEnumOption("type", (opt) => {
    opt.addChoice("clear", "Clears the weather.")
      .addChoice("rain", "Makes it rain.")
      .addChoice("thunder", "Makes it rain heavily with lightning.");
  })
  .addNumberOption("duration", (opt) => {
    opt.setDescription("The duration in ticks")
      .setDisplayText("duration")
      .setDefaultValue("120000")
      .setOptional();
  });

module.exports = {
  "1.12": {
    name: "weather",
    builder: weatherCommandBuilder
  }
};