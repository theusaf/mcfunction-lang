const { CommandBuilder } = require("../class/builders");

const forceloadCommandBuilder = new CommandBuilder("forceload")
  .addSubCommand("add", "sub command", (sub) => {
    sub.setDescription("Adds new chunk(s) to be force loaded.")
      .addCoordinateOption("from", 2, (opt) => {
        opt.setDescription("The chunk x/z coordinates to force load");
      })
      .addCoordinateOption("to", 2, (opt) => {
        opt.setDescription("The corner to force load chunks towards");
      });
  })
  .addSubCommand("remove", "sub command", (sub) => {
    sub.setDescription("Stops chunk(s) from being force loaded.")
      .addSubCommand("all", (sub) => {
        sub.setDescription("Stops force loading all force loaded chunks.");
      })
      .addCoordinateOption("from", 2, (opt) => {
        opt.setDescription("The chunk x/z coordinates to stop force loading");
      })
      .addCoordinateOption("to", 2, (opt) => {
        opt.setDescription("The corner to stop force loading chunks towards");
      });
  })
  .addSubCommand("query", "sub command", (sub) => {
    sub.setDescription("Gets information about force laoded chunks.")
      .addCoordinateOption("position", 2, (opt) => {
        opt.setOptional()
          .setDescription("The chunk x/z coordinates to check. If omitted, all force loaded chunks are returned.");
      });
  });

module.exports = {
  "1.13": {
    name: "forceload",
    builder: forceloadCommandBuilder
  }
};