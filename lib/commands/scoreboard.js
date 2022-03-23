const { stripIndent } = require("common-tags/lib"),
  CommandBuilder = require("../class/CommandBuilder");

const scoreboardCommandBuilder12 = new CommandBuilder("scoreboard")
    .setDescription("Interacts with scoreboards and related data.")
    .addSubCommand("objectives", "sub command", (sub) => {
      sub.addSubCommand("list", "objectives sub command", (sub) => {
        sub.setDescription("Lists all scoreboard objectives.");
      })
        .addSubCommand("add", "objectives sub command", (sub) => {
          sub.setDescription("Creates a new scoreboard objective.")
            .addStringOption("id", (opt) => {
              opt.setOptional()
                .setDescription("An objective id")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            })
            .addObjectiveOption("objective")
            .addStringOption("display name", (opt) => {
              opt.setOptional()
                .setDescription("The objective's display name")
                .setSnippet("${1:name}")
                .setDisplayText("display name");
            });
        })
        .addSubCommand("remove", "objectives sub command", (sub) => {
          sub.setDescription("Removes a scoreboard objective.")
            .addStringOption("id", (opt) => {
              opt.setDescription("The objective to modify")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            });
        })
        .addSubCommand("setdisplay", "objectives sub command", (sub) => {
          sub.setDescription("Sets the display position of a scoreboard objective.")
            .addScoreboardDisplayOption("display")
            .addStringOption("objective", (opt) => {
              opt.setOptional()
                .setDescription("The objective to modify")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            });
        });
    })
    .addSubCommand("players", "sub command", (sub) => {
      sub.addSubCommand("list", "players sub command", (sub) => {
        sub.setDescription("Lists all tracked scoreboard entities or the scores of a tracked user.")
          .addStringOption("target", (opt) => {
            opt.setText("*")
              .setDescription("Selects all score holders")
              .setOptional()
              .setParallel();
          })
          .addSelectorOption("target", (opt) => {
            opt.setDescription("The score holder(s) to list")
              .setOptional();
          });
      })
        .addSubCommand("set", "players sub command", (sub) => {
          sub.setDescription("Sets the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to operate on");
            })
            .addNumberOption("score", (opt) => {
              opt.setDescription("The score value to set");
            })
            .addNBTOption("nbt match", (opt) => {
              opt.setDescription("The NBT data the entity must match before continuing")
                .setDisplayText("NBT match")
                .setOptional();
            });
        })
        .addSubCommand("add", "players sub command", (sub) => {
          sub.setDescription("Increments the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to add");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to modify in")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addNumberOption("count", (opt) => {
              opt.setDescription("The amount to increment by")
                .setDefaultValue("1");
            })
            .addNBTOption("nbt match", (opt) => {
              opt.setDescription("The NBT data the entity must match before continuing")
                .setDisplayText("NBT match")
                .setOptional();
            });
        })
        .addSubCommand("remove", "players sub command", (sub) => {
          sub.setDescription("Decrements the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to remove");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective of which to remove the score holder in")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addNumberOption("count", (opt) => {
              opt.setDescription("The amount to decrement by")
                .setDefaultValue("1");
            })
            .addNBTOption("nbt match", (opt) => {
              opt.setDescription("The NBT data the entity must match before continuing")
                .setDisplayText("NBT match")
                .setOptional();
            });
        })
        .addSubCommand("reset", "players sub command", (sub) => {
          sub.setDescription("Deletes the score of scoreboard entity(s) for an objective or all objectives.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to reset");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective the score holder's score is being reset in")
                .setDisplayText("objective")
                .setOptional()
                .setSnippet("${1:objective}");
            });
        })
        .addSubCommand("enable", "players sub command", (sub) => {
          sub.setDescription("Enables an entity to use the /trigger command on an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to operate on");
            })
            .addStringOption("trigger", (opt) => {
              opt.setDescription("The trigger objective to enable")
                .setDisplayText("trigger")
                .setSnippet("${1:trigger}");
            });
        })
        .addSubCommand("test", "players sub command", (sub) => {
          sub.setDescription("Tests the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to test")
                .setOptional();
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to query")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addStringOption("min", (opt) => {
              opt.setParallel()
                .setText("*")
                .setDescription("Sets the min value to -2147483648.");
            })
            .addNumberOption("min", (opt) => {
              opt.setDescription("The minimum value to check for");
            })
            .addStringOption("max", (opt) => {
              opt.setParallel()
                .setText("*")
                .setDescription("Sets the max value to 2147483648.")
                .setOptional();
            })
            .addNumberOption("max", (opt) => {
              opt.setDescription("The maximum value to check for")
                .setOptional();
            });
        })
        .addSubCommand("operation", "players sub command", (sub) => {
          sub.setDescription("Applies arithmetic operatinos on the score of scoreboard entity(s) for an objective.")
            .addStringOption("target", (opt) => {
              opt.setText("*")
                .setDescription("Selects all score holders")
                .setParallel();
            })
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to operate on");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective the target's score is being modified in")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addEnumOption("operation", (opt) => {
              opt.addChoice("+=", "Addition. Adds the source's score to the target's score.")
                .addChoice("-=", "Subtraction. Subtracts the source's score from the target's score.")
                .addChoice("*=", "Multiplication. Multiplies the target's score by the source's score.")
                .addChoice("%=", "Modular division. Sets the target's score to the remainder of the division between the target and the source's score.")
                .addChoice("=", "Assign. Sets the target's score to the source's score.")
                .addChoice("<", "Min. If the source's score is less than the target's score, the target's score is set to the source's score.")
                .addChoice(">", "Max. If the source's score is greater than the target's score, the target's score is set to the source's score.")
                .addChoice("><", "Swap. Swaps the target's and the source's scores.");
            })
            .addSelectorOption("source", (opt) => {
              opt.setDescription("The source score holder");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to query the source's score from")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            });
        })
        .addSubCommand("tag", "players sub command", (sub) => {
          sub.setDescription("Adds, removes, and manages tags on entities.")
            .addSubCommand("add", "tag sub command", (sub) => {
              sub.setDescription("Adds a tag.")
                .addSelectorOption("targets")
                .addStringOption("tag name", (opt) => {
                  opt.setSnippet("${1:tagName}")
                    .setDescription("The tag name to add")
                    .setDisplayText("tag name");
                })
                .addNBTOption("nbt match", (opt) => {
                  opt.setDescription("The NBT data that must be matched before adding the tag")
                    .setDisplayText("NBT match")
                    .setOptional();
                });
            })
            .addSubCommand("remove", "tag sub command", (sub) => {
              sub.setDescription("Removes a tag.")
                .addSelectorOption("targets")
                .addStringOption("tag name", (opt) => {
                  opt.setSnippet("${1:tagName}")
                    .setDescription("The tag name to remove")
                    .setDisplayText("tag name");
                })
                .addNBTOption("nbt match", (opt) => {
                  opt.setDescription("The NBT data that must be matched before removing the tag")
                    .setDisplayText("NBT match")
                    .setOptional();
                });
            })
            .addSubCommand("list", "tag sub command", (sub) => {
              sub.setDescription("Lists tags.")
                .addSelectorOption("targets");
            });
        });
    })
    .addSubCommand("teams", "sub command", (sub) => {
      sub.addSubCommand("list", "teams sub command", (sub) => {
        sub.setDescription("Lists teams or entities in a team.")
          .addStringOption("team name", (opt) => {
            opt.setSnippet("${1:team_id}")
              .setDisplayText("team name")
              .setDescription("The team to list members in")
              .setOptional();
          });
      })
        .addSubCommand("add", "teams sub command", (sub) => {
          sub.setDescription("Creates a new team.")
            .addStringOption("team name", (opt) => {
              opt.setSnippet("${1:team_id}")
                .setDescription("The team name to add")
                .setDisplayText("team name");
            })
            .addStringOption("display name", (opt) => {
              opt.setSnippet("${1:display name}")
                .setDescription("The team's display name")
                .setDisplayText("display name")
                .setOptional();
            });
        })
        .addSubCommand("remove", "teams sub command", (sub) => {
          sub.setDescription("Removes a team.")
            .addStringOption("team name", (opt) => {
              opt.setDescription("The team to remove")
                .setSnippet("${1:team_id}")
                .setDisplayText("team name");
            });
        })
        .addSubCommand("empty", "teams sub command", (sub) => {
          sub.setDescription("Removes all entities from a team.")
            .addStringOption("team name", (opt) => {
              opt.setSnippet("${1:team_id}")
                .setDisplayText("team name")
                .setDescription("The team to clear entities from");
            });
        })
        .addSubCommand("join", "teams sub command", (sub) => {
          sub.setDescription("Adds entities to a team.")
            .addStringOption("team name", (opt) => {
              opt.setSnippet("${1:team_id}")
                .setDescription("The team to join")
                .setDisplayText("team name");
            })
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The entities to add to the team");
            });
        })
        .addSubCommand("leave", "teams sub command", (sub) => {
          sub.setDescription("Removes entities from a team.")
            .addSelectorOption("targets")
            .setOptional();
        })
        .addSubCommand("option", "teams sub command", (sub) => {
          sub.setDescription("Modifies team settings.")
            .addStringOption("team name", (opt) => {
              opt.setSnippet("${1:team_id}")
                .setDescription("The team name to modify")
                .setDisplayText("team name");
            })
            .addSubCommand("color", "setting", (sub) => {
              sub.setDescription("Changes the color of the team.")
                .addEnumOption("color", (opt) => {
                  opt.addChoice("black")
                    .addChoice("dark_blue")
                    .addChoice("dark_green")
                    .addChoice("dark_aqua")
                    .addChoice("dark_red")
                    .addChoice("dark_purple")
                    .addChoice("gold")
                    .addChoice("gray")
                    .addChoice("dark_gray")
                    .addChoice("blue")
                    .addChoice("green")
                    .addChoice("aqua")
                    .addChoice("red")
                    .addChoice("light_purple")
                    .addChoice("yellow")
                    .addChoice("white")
                    .addChoice("reset", "Resets the color to the default color and formatting.");
                });
            })
            .addSubCommand("friendlyfire", "setting", (sub) => {
              sub.setDescription("Changes whether friendly fire is enabled in the team.")
                .addBooleanOption("value", (opt) => {
                  opt.setDescription("Whether friendly fire should be enabled or not");
                });
            })
            .addSubCommand("seeFriendlyInvisibles", "setting", (sub) => {
              sub.setDescription("Changes whether team members can see other invisible team mebers.")
                .addBooleanOption("value", (opt) => {
                  opt.setDescription("Whether team members should be able to see invisible team members");
                });
            })
            .addSubCommand("nametagVisibility", "setting", (sub) => {
              sub.setDescription("Changes the visibility of a name tags for a team.")
                .addEnumOption("mode", (opt) => {
                  opt.addChoice("never", "Entities in the team will not render name tags.")
                    .addChoice("hideForOtherTeam", "Entities outside of the team will not be able to see the team member's name tags.")
                    .addChoice("hideForOwnTeam", "Entities inside the team will not be able to see the team member's name tags.")
                    .addChoice("always", "All entities will render and see team member's name tags.");
                });
            })
            .addSubCommand("deathMessageVisibility", "setting", (sub) => {
              sub.setDescription("Changes the visdiblity of death messages for a team.")
                .addEnumOption("mode", (opt) => {
                  opt.addChoice("never", "Death messages for team members will not appear in chat.")
                    .addChoice("hideForOtherTeam", "Death messages for team members will only appear to the team.")
                    .addChoice("hideForOwnTeam", "Death messages for team members will only appear for non-team members.")
                    .addChoice("always", "Death messages for team members will appear in chat to everyone.");
                });
            })
            .addSubCommand("collisionRule", "setting", (sub) => {
              sub.setDescription("Changes the collision effects for a team.")
                .addEnumOption("mode", (opt) => {
                  opt.addChoice("never", "Entities in the team will not collide with any other entity.")
                    .addChoice("pushOwnTeam", stripIndent`
              Entities in the team will collide with team members, but not with entities outside of the team.
              - Note: See MC-87984
              `)
                    .addChoice("pushOtherTeams", stripIndent`
              Entities in the team will only push entities on opposing teams.
              - Note: See MC-87984
              `)
                    .addChoice("always", "All entities will always collide with other entities.");
                });
            });
        });
    }),

  scoreboardCommandBuilder13 = new CommandBuilder("scoreboard")
    .setDescription("Interacts with scoreboards and related data.")
    .addSubCommand("objectives", "sub command", (sub) => {
      sub.addSubCommand("list", "objectives sub command", (sub) => {
        sub.setDescription("Lists all scoreboard objectives.");
      })
        .addSubCommand("add", "objectives sub command", (sub) => {
          sub.setDescription("Creates a new scoreboard objective.")
            .addStringOption("id", (opt) => {
              opt.setOptional()
                .setDescription("An objective id")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            })
            .addObjectiveOption("objective")
            .addNBTOption("display name", (opt) => {
              opt.setOptional()
                .setDescription("The objective's display name")
                .setSnippet("${1:{\"text\":\"name\"\\}}")
                .setDisplayText("display name");
            });
        })
        .addSubCommand("remove", "objectives sub command", (sub) => {
          sub.setDescription("Removes a scoreboard objective.")
            .addStringOption("id", (opt) => {
              opt.setDescription("The objective to modify")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            });
        })
        .addSubCommand("setdisplay", "objectives sub command", (sub) => {
          sub.setDescription("Sets the display position of a scoreboard objective.")
            .addScoreboardDisplayOption("display")
            .addStringOption("objective", (opt) => {
              opt.setOptional()
                .setDescription("The objective to modify")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            });
        })
        .addSubCommand("modify", "objectives sub command", (sub) => {
          sub.setDescription("Modifies settings of an objective")
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to modify")
                .setSnippet("${1:objective}")
                .setDisplayText("objective");
            })
            .addSubCommand("displayname", (sub) => {
              sub.setDescription("Changes the objective's display name.")
                .addNBTOption("display name", (opt) => {
                  opt.setDescription("The objective's display name")
                    .setSnippet("${1:{\"text\":\"name\"\\}}")
                    .setDisplayText("display name");
                });
            })
            .addSubCommand("rendertype", (sub) => {
              sub.setDescription("Changes the display format of scores for this objective.")
                .addEnumOption("format", (opt) => {
                  opt.addChoice("hearts")
                    .addChoice("integer");
                });
            });
        });
    })
    .addSubCommand("players", "sub command", (sub) => {
      sub.addSubCommand("list", "players sub command", (sub) => {
        sub.setDescription("Lists all tracked scoreboard entities or the scores of a tracked user.")
          .addStringOption("target", (opt) => {
            opt.setText("*")
              .setDescription("Selects all score holders")
              .setOptional()
              .setParallel();
          })
          .addSelectorOption("target", (opt) => {
            opt.setDescription("The score holder(s) to list")
              .setOptional();
          });
      })
        .addSubCommand("set", "players sub command", (sub) => {
          sub.setDescription("Sets the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to operate on");
            })
            .addNumberOption("score", (opt) => {
              opt.setDescription("The score value to set");
            });
        })
        .addSubCommand("add", "players sub command", (sub) => {
          sub.setDescription("Increments the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to add");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to modify in")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addNumberOption("count", (opt) => {
              opt.setDescription("The amount to increment by")
                .setDefaultValue("1");
            });
        })
        .addSubCommand("remove", "players sub command", (sub) => {
          sub.setDescription("Decrements the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to remove");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective of which to remove the score holder in")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addNumberOption("count", (opt) => {
              opt.setDescription("The amount to decrement by")
                .setDefaultValue("1");
            });
        })
        .addSubCommand("reset", "players sub command", (sub) => {
          sub.setDescription("Deletes the score of scoreboard entity(s) for an objective or all objectives.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to reset");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective the score holder's score is being reset in")
                .setDisplayText("objective")
                .setOptional()
                .setSnippet("${1:objective}");
            });
        })
        .addSubCommand("enable", "players sub command", (sub) => {
          sub.setDescription("Enables an entity to use the /trigger command on an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to operate on");
            })
            .addStringOption("trigger", (opt) => {
              opt.setDescription("The trigger objective to enable")
                .setDisplayText("trigger")
                .setSnippet("${1:trigger}");
            });
        })
        .addSubCommand("test", "players sub command", (sub) => {
          sub.setDescription("Tests the score of scoreboard entity(s) for an objective.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to test")
                .setOptional();
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to query")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addStringOption("min", (opt) => {
              opt.setParallel()
                .setText("*")
                .setDescription("Sets the min value to -2147483648.");
            })
            .addNumberOption("min", (opt) => {
              opt.setDescription("The minimum value to check for");
            })
            .addStringOption("max", (opt) => {
              opt.setParallel()
                .setText("*")
                .setDescription("Sets the max value to 2147483648.")
                .setOptional();
            })
            .addNumberOption("max", (opt) => {
              opt.setDescription("The maximum value to check for")
                .setOptional();
            });
        })
        .addSubCommand("operation", "players sub command", (sub) => {
          sub.setDescription("Applies arithmetic operatinos on the score of scoreboard entity(s) for an objective.")
            .addStringOption("target", (opt) => {
              opt.setText("*")
                .setDescription("Selects all score holders")
                .setParallel();
            })
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The score holder(s) to operate on");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective the target's score is being modified in")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            })
            .addEnumOption("operation", (opt) => {
              opt.addChoice("+=", "Addition. Adds the source's score to the target's score.")
                .addChoice("-=", "Subtraction. Subtracts the source's score from the target's score.")
                .addChoice("*=", "Multiplication. Multiplies the target's score by the source's score.")
                .addChoice("%=", "Modular division. Sets the target's score to the remainder of the division between the target and the source's score.")
                .addChoice("=", "Assign. Sets the target's score to the source's score.")
                .addChoice("<", "Min. If the source's score is less than the target's score, the target's score is set to the source's score.")
                .addChoice(">", "Max. If the source's score is greater than the target's score, the target's score is set to the source's score.")
                .addChoice("><", "Swap. Swaps the target's and the source's scores.");
            })
            .addSelectorOption("source", (opt) => {
              opt.setDescription("The source score holder");
            })
            .addStringOption("objective", (opt) => {
              opt.setDescription("The objective to query the source's score from")
                .setDisplayText("objective")
                .setSnippet("${1:objective}");
            });
        });
    });

module.exports = {
  "1.12": {
    name: "scoreboard",
    builder: scoreboardCommandBuilder12
  },
  "1.13": {
    name: "scoreboard",
    builder: scoreboardCommandBuilder13
  }
};