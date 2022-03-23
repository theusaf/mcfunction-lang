const { CommandBuilder } = require("../class/builders");

const defaultGamemodeCommandBuilder12 = new CommandBuilder("defaultgamemode")
    .setDescription("Sets the default game mode.")
    .addEnumOption("game mode", (opt) => {
      opt.addChoice("creative", "Flight, building, and invulnerability")
        .addChoice("survival", "Resource gathering, crafting, mining, and survival")
        .addChoice("spectator", "Flight, noclip, viewing")
        .addChoice("adventure", "Survival, no griefing")
        .addChoice("c", "Flight, building, and invulnerability")
        .addChoice("s", "Resource gathering, crafting, mining, and survival")
        .addChoice("sp", "Flight, noclip, viewing")
        .addChoice("a", "Survival, no griefing")
        .addChoice("1", "Flight, building, and invulnerability")
        .addChoice("0", "Resource gathering, crafting, mining, and survival")
        .addChoice("3", "Flight, noclip, viewing")
        .addChoice("2", "Survival, no griefing");
    }),

  defaultGamemodeCommandBuilder13 = new CommandBuilder("defaultgamemode")
    .setDescription("Sets the default game mode.")
    .addEnumOption("game mode", (opt) => {
      opt.addChoice("creative", "Flight, building, and invulnerability")
        .addChoice("survival", "Resource gathering, crafting, mining, and survival")
        .addChoice("spectator", "Flight, noclip, viewing")
        .addChoice("adventure", "Survival, no griefing");
    });

module.exports = {
  "1.12": {
    name: "defaultgamemode",
    builder: defaultGamemodeCommandBuilder12
  },
  "1.13": {
    name: "defaultgamemode",
    builder: defaultGamemodeCommandBuilder13
  }
};