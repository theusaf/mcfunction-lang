const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput"),
  SelectorOutput = require("../class/output/SelectorOutput"),
  StringOutput = require("../class/output/StringOutput"),
  EnumOutput = require("../class/output/EnumOutput");

class TeleportCommand12 extends BaseCommand {
  constructor() {super(["tp", "teleport"]);}

  handleSuggestions(tokens) {
    const isCoordinate = /^[\d~^]/.test(tokens[1]?.getValue()),
      isCoordinate2 = /^[\d~^]/.test(tokens[2]?.getValue());
    switch (tokens.length) {
      case 1: {
        return [
          new CommandNameOutput("tp", "Teleports entities. Coordinates are relative to teleported targets."),
          new CommandNameOutput("teleport", "Teleports entities. Coordinates are relative to command's execution.")
        ];
      }
      case 2: {
        return [
          new SelectorOutput("The destination player or target.", "targets"),
          new CoordinateOutput("x y z", "~", 3, "The destination location.")
        ];
      }
      case 3: {
        // check if previous token is '~', '^', or a number
        if (isCoordinate) {
          return [new CoordinateOutput("y z", "~", 2, "The destination location.")];
        } else {
          return [
            (new SelectorOutput("The destination target.", "target")).optional(),
            (new CoordinateOutput("x y z", "~", 3, "The destination location.")).optional()
          ];
        }
      }
      case 4: {
        if (isCoordinate) {
          return [new CoordinateOutput("z", "~", 1, "The destination location.")];
        } else if (isCoordinate2) {
          return [new CoordinateOutput("y z", "~", 2, "The destination location.")];
        }
        break;
      }
      case 5: {
        if (isCoordinate) {
          return [(new CoordinateOutput("yaw pitch", "~", 2, "The yaw and pitch to be teleported to.")).optional()];
        } else if (isCoordinate2) {
          return [new CoordinateOutput("z", "~", 1, "The destination location")];
        }
        break;
      }
      case 6: {
        if (isCoordinate) {
          return [(new CoordinateOutput("pitch", "~", 1, "The yaw and pitch to be teleported to.")).optional()];
        } else if (isCoordinate2) {
          return [(new CoordinateOutput("yaw pitch", "~", 2, "The yaw and pitch to be teleported to.")).optional()];
        }
        break;
      }
      case 7: {
        if (isCoordinate2) {
          return [(new CoordinateOutput("pitch", "~", 1, "The yaw and pitch to be teleported to.")).optional()];
        }
      }
    }
  }
}

class TeleportCommand13 extends TeleportCommand12 {

  handleSuggestions(tokens) {
    const isCoordinate = /^[\d~^]/.test(tokens[1]?.getValue()),
      isCoordinate2 = /^[\d~^]/.test(tokens[2]?.getValue()),
      isFacing = tokens[5]?.getValue() === "facing",
      isFacingEntity = tokens[6]?.getValue() === "entity";
    switch (tokens.length) {
      case 1: {
        return [
          new CommandNameOutput("tp", "Teleports entities. Coordinates are relative to command's execution."),
          new CommandNameOutput("teleport", "Teleports entities. Coordinates are relative to command's execution.")
        ];
      }
      case 6: {
        if (!isCoordinate && isCoordinate2) {
          const output = super.handleSuggestions(tokens);
          output.splice(0, 0, (new StringOutput("facing", "Teleport facing towards a certain block/entity")).optional());
          return output;
        }
        break;
      }
      case 7: {
        if (!isCoordinate && isCoordinate2 && isFacing) {
          return [
            new CoordinateOutput(
              "x y z", "~", 3, "The location to look towards."
            ),
            (new StringOutput("entity", "Teleport facing an entity.")).optional()
          ];
        }
        break;
      }
      case 8: {
        if (!isCoordinate && isCoordinate2 && isFacing) {
          if (isFacingEntity) {
            return [new SelectorOutput("The target to look towards", "facingEntity")];
          } else {
            return [new CoordinateOutput(
              "y z",
              "~",
              2,
              "The location to look towards."
            )];
          }
        }
        break;
      }
      case 9: {
        if (!isCoordinate && isCoordinate2 && isFacing) {
          if (isFacingEntity) {
            return [(new EnumOutput(
              ["eyes", "Anchor"],
              ["feet", "Anchor"]
            )).optional()];
          } else {
            return [new CoordinateOutput(
              "z",
              "~",
              1,
              "The location to look towards."
            )];
          }
        }
      }
    }
    return super.handleSuggestions(tokens);
  } 

}

module.exports = {
  "1.12": new TeleportCommand12,
  "1.13": new TeleportCommand13
};
