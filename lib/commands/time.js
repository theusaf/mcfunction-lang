const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const timeCommandBuilder12 = new CommandBuilder("time")
    .setDescription("Sets the world time.")
    .addSubCommand("set", (sub) => {
      sub.addEnumOption("value", (opt) => {
        opt.setParallel()
          .addChoice("day", "Sets the time to 1000.")
          .addChoice("night", "Sets the time to 13000.");
      })
        .addNumberOption("value", (opt) => {
          opt.setDescription("Sets the time to the specified value (ticks).")
            .setDisplayText("time");
        });
    })
    .addSubCommand("add", (sub) => {
      sub.addNumberOption("value", (opt) => {
        opt.setDescription("Adds the specified value to the time (ticks).")
          .setDisplayText("time");
      });
    })
    .addSubCommand("query", (sub) => {
      sub.addEnumOption("value", (opt) => {
        opt.addChoice("daytime", "Returns the current day time in ticks.")
          .addChoice("day", stripIndent`
        Returns the current day.
        - This is the number of in-game days since the world was created.
        `)
          .addChoice("gametime", stripIndent`
        Returns the current game time in ticks.
        - This is the number of ticks since the world was created.
        `);
      });
    }),

  timeCommandBuilder13 = new CommandBuilder("time")
    .setDescription("Sets the world time.")
    .addSubCommand("set", (sub) => {
      sub.addEnumOption("value", (opt) => {
        opt.setParallel()
          .addChoice("day", "Sets the time to 1000.")
          .addChoice("night", "Sets the time to 13000.")
          .addChoice("noon", "Sets the time to 6000.")
          .addChoice("midnight", "Sets the time to 18000.");
      })
        .addNumberOption("value", (opt) => {
          opt.setDescription("Sets the time to the specified value (ticks).")
            .setDisplayText("time");
        });
    })
    .addSubCommand("add", (sub) => {
      sub.addNumberOption("value", (opt) => {
        opt.setDescription("Adds the specified value to the time (ticks).")
          .setDisplayText("time");
      });
    })
    .addSubCommand("query", (sub) => {
      sub.addEnumOption("value", (opt) => {
        opt.addChoice("daytime", "Returns the current day time in ticks.")
          .addChoice("day", stripIndent`
        Returns the current day.
        - This is the number of in-game days since the world was created.
        `)
          .addChoice("gametime", stripIndent`
        Returns the current game time in ticks.
        - This is the number of ticks since the world was created.
        `);
      });
    });

module.exports = {
  "1.12": {
    name: "time",
    builder: timeCommandBuilder12
  },
  "1.13": {
    name: "time",
    builder: timeCommandBuilder13
  }
};