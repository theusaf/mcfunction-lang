const { CommandBuilder } = require("../class/builders");

const difficultyCommandBuilder12 = new CommandBuilder("difficulty")
    .setDescription("Sets the difficulty for the world.")
    .addEnumOption("difficulty", (opt) => {
      opt.addChoice("peaceful")
        .addChoice("easy")
        .addChoice("normal")
        .addChoice("hard")
        .addChoice("p")
        .addChoice("e")
        .addChoice("n")
        .addChoice("h")
        .addChoice("0")
        .addChoice("1")
        .addChoice("2")
        .addChoice("3");
    }),

  difficultyCommandBuilder13 = new CommandBuilder("difficulty")
    .setDescription("Sets the difficulty for the world.")
    .addEnumOption("difficulty", (opt) => {
      opt.addChoice("peaceful")
        .addChoice("easy")
        .addChoice("normal")
        .addChoice("hard");
    });

module.exports = {
  "1.12": {
    name: "difficulty",
    builder: difficultyCommandBuilder12
  },
  "1.13": {
    name: "difficulty",
    builder: difficultyCommandBuilder13
  }
};