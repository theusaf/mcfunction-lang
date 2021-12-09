const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  NumberOutput = require("../class/output/NumberOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  ParticleOutput = require("../class/output/ParticleOutput"),
  BlockOutput = require("../class/output/BlockOutput"),
  ItemOutput = require("../class/output/ItemOutput");

class ParticleCommand12 extends BaseCommand {
  constructor() {
    super("particle");
  }

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("particle", "Create particle effects.")];
      }
      case 2: {
        return [new ParticleOutput(null, "particle")];
      }
      case 3:
      case 4:
      case 5: {
        return [new CoordinateOutput("position", "~", 6 - tokens.length, "Location to start showing the particles.")];
      }
      case 6:
      case 7:
      case 8: {
        const delta = new CoordinateOutput(
          "delta",
          "1",
          9 - tokens.length,
          "The bounding box particles can appear in. For certain particles, this could be rgb values, motion values, or change in rgb values");
        delta.descriptionMoreURL = "https://minecraft.fandom.com/wiki/Commands/particle#Arguments";
        return [delta];
      }
      case 9: {
        const speed = new NumberOutput("speed", "The speed of movement for particles", "0");
        speed.descriptionMoreURL = "https://minecraft.fandom.com/wiki/Commands/particle#Arguments";
        return [speed];
      }
      case 10: {
        return [
          (new NumberOutput("count", "The number of particles to display", "1")).optional()
        ];
      }
      case 11: {
        return [
          (new EnumOutput(
            ["force", "displayMode", "Blocks are displayed up to 512 blocks away."],
            ["normal", "displayMode", "Default value. Particles are displayed up to 32 blocks away."]
          )).optional()
        ];
      }
      case 12: {
        return [(new SelectorOutput).optional()];
      }
      default: {
        return [(new StringOutput("$1", null, true, "params")).optional()];
      }
    }
  }
}

class ParticleCommand13 extends BaseCommand {

  constructor() {super("particle");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("particle", "Create particle effects.")];
      }
      case 2: {
        return [new ParticleOutput(null, "particle")];
      }
    }
    const particle = tokens[1].getValue();
    let index = tokens.length;
    if (!["block", "falling_dust", "item"].includes(particle)) {index++;}
    switch (index) {
      case 3: {
        if (particle === "item") {
          return [new ItemOutput("The item particle to display.", "item")];
        } else {
          return [new BlockOutput("The block particle to display.", "block")];
        }
      }
      case 4:
      case 5:
      case 6: {
        return [new CoordinateOutput(
          "pos",
          "~",
          7 - index,
          "The position to render the particles at"
        )];
      }
      case 7: {
        return [(new CoordinateOutput(
          "delta",
          "~",
          3,
          "The cubic size for where the particles can spawn."
        )).optional()];
      }
      case 8:
      case 9: {
        return [(new CoordinateOutput(
          "delta",
          "0",
          10 - index,
          "The cubic size for where the particles can spawn."
        )).optional()];
      }
      case 10:
      case 11:
      case 12: {
        return [new CoordinateOutput(
          "speed",
          "0",
          13 - index,
          "The movement speed of the particles"
        )];
      }
      case 13: {
        return [new NumberOutput("count", "The number of particles to spawn", "1")];
      }
      case 14: {
        return [
          (new EnumOutput(
            ["force", "displayMode", "Blocks are displayed up to 512 blocks away."],
            ["normal", "displayMode", "Default value. Particles are displayed up to 32 blocks away."]
          )).optional()
        ];
      }
      case 15: {
        return [(new SelectorOutput("The players that can see the particles.", "viewers")).optional()];
      }
    }
  }

}

module.exports = {
  "1.12": new ParticleCommand12,
  "1.13": new ParticleCommand13
};
