const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const scheduleCommandBuilder14 = new CommandBuilder("schedule")
    .setDescription("Schedules functions to run at a later time.")
    .addStringOption("sub command", (opt) => {
      opt.setText("function");
    })
  // TODO
    .addStringOption("function", (opt) => {
      opt.setSnippet("${1:namespace}:${2:name}")
        .setDisplayText("function")
        .setDescription("The function to schedule");
    })
    .addStringOption("time", (opt) => {
      opt.setSnippet("${1:time}")
        .setDisplayText("time")
        .setDescription(stripIndent`
      The delay time in days, seconds, or ticks
      To specify the unit, append either 'd', 's', or 't'
      It defaults to 't'. Days are in-game days.
      `);
    }),


  scheduleCommandBuilder15 = new CommandBuilder("schedule")
    .setDescription("Schedules functions to run at a later time.")
    .addSubCommand("function", "sub command", (sub) => {
    // TODO
      sub.addStringOption("function", (opt) => {
        opt.setSnippet("${1:namespace}:${2:name}")
          .setDisplayText("function")
          .setDescription("The function to schedule");
      })
        .addStringOption("time", (opt) => {
          opt.setSnippet("${1:time}")
            .setDisplayText("time")
            .setDescription(stripIndent`
        The delay time in days, seconds, or ticks
        To specify the unit, append either 'd', 's', or 't'
        It defaults to 't'. Days are in-game days.
        `);
        })
        .addEnumOption("mode", (opt) => {
          opt.setOptional()
            .addChoice("append", "Allows multiple schedules of the function to exist.")
            .addChoice("replace", "Replaces the current function's schedule.");
        });
    })
    .addSubCommand("clear", "sub command", (sub) => {
      sub.addStringOption("function", (opt) => {
        opt.setSnippet("${1:namespace}:${2:name}")
          .setDisplayText("function")
          .setDescription("The function whose schedule to clear");
      });
    });
  
module.exports = {
  "1.14": {
    name: "schedule",
    builder: scheduleCommandBuilder14
  },
  "1.15": {
    name: "schedule",
    builder: scheduleCommandBuilder15
  }
};