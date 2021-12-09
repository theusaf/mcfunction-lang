const BaseCommand = require("../class/BaseCommand"),
  CommandNameOutput = require("../class/output/CommandNameOutput"),
  EnumOutput = require("../class/output/EnumOutput"),
  StringOutput = require("../class/output/StringOutput"),
  CoordinateOutput = require("../class/output/CoordinateOutput");

class ForceloadCommand extends BaseCommand {

  constructor() {super("forceload");}

  handleSuggestions(tokens) {
    switch (tokens.length) {
      case 1: {
        return [new CommandNameOutput("forceload", "Forces chunks to be loaded.")];
      }
      case 2: {
        return [new EnumOutput(
          ["add", "Sub Command", "Forces a chunk to stay loaded."],
          ["remove", "Sub Command", "Unforces a chunk to stay loaded."],
          ["query", "Sub Command", "Displays information about forced loaded chunks."]
        )];
      }
    }
    const subCommand = tokens[1].getValue();
    switch (subCommand) {
      case "add": {
        if (tokens.length <= 4) {
          return [new CoordinateOutput(
            "from",
            "~",
            5 - tokens.length,
            "The chunk coordinates (x/z) to force load"
          )];
        } else if (tokens.length <= 6) {
          return [(new CoordinateOutput(
            "to",
            "~",
            7 - tokens.length,
            "The corner to load chunks towards"
          )).optional()];
        }
        break;
      }
      case "remove": {
        if (tokens.length <= 4) {
          const output = [];
          if (tokens.length === 3) {
            output.push(new StringOutput("all", "Stop force loading all force loaded chunks."));
          } else if (tokens[2].getValue() === "all") {
            return;
          }
          output.push(new CoordinateOutput(
            "from",
            "~",
            5 - tokens.length,
            "The chunk coordinates (x/z) to stop force loading"
          ));
          return output;
        } else if (tokens.length <= 6) {
          if (tokens[2].getValue() === "all") {
            return;
          }
          return [(new CoordinateOutput(
            "to",
            "~",
            7 - tokens.length,
            "The corner to stop force loading towards"
          )).optional()];
        }
        break;
      }
      case "query": {
        if (tokens.length <= 4) {
          return [(new CoordinateOutput(
            "pos",
            "~",
            5 - tokens.length,
            "The chunk coordinate to check. If omitted, all force loaded chunks are returned"
          )).optional()];
        }
      }
    }
  }

}

module.exports = {
  "1.13": new ForceloadCommand
};