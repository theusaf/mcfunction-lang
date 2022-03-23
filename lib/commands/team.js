const CommandBuilder = require("../class/CommandBuilder"),
  { stripIndent } = require("common-tags");

const teamCommandBuilder = new CommandBuilder("team")
  .setDescription("Interacts and manages teams.")
  .addSubCommand("list", (sub) => {
    sub.setDescription("Lists teams or members in a team.")
      .addStringOption("team", (opt) => {
        opt.setDescription("The team to get information from")
          .setSnippet("${1:team}")
          .setDisplayText("team")
          .setOptional();
      });
  })
  .addSubCommand("add", (sub) => {
    sub.setDescription("Creates a team.")
      .addStringOption("team name", (opt) => {
        opt.setDisplayText("team name")
          .setSnippet("${1:team_name}")
          .setDescription("The team name");
      })
      .addStringOption("display name", (opt) => {
        opt.setDisplayText("display name")
          .setSnippet("${1:{\"text\":\"name\"\\}}")
          .setDescription("The raw JSON team display name")
          .setOptional();
      });
  })
  .addSubCommand("remove", (sub) => {
    sub.setDescription("Deletes a team.")
      .addStringOption("team", (opt) => {
        opt.setDescription("The team to delete")
          .setSnippet("${1:team}")
          .setDisplayText("team");
      });
  })
  .addSubCommand("empty", (sub) => {
    sub.setDescription("Removes all entities from a team.")
      .addStringOption("team", (opt) => {
        opt.setDescription("The team to clear")
          .setSnippet("${1:team}")
          .setDisplayText("team");
      });
  })
  .addSubCommand("join", (sub) => {
    sub.setDescription("Adds entities to a team.")
      .addStringOption("team", (opt) => {
        opt.setDescription("The team to add entities to")
          .setSnippet("${1:team}")
          .setDisplayText("team");
      })
      .addSelectorOption("members", (opt) => {
        opt.setDescription("The entities to add to the team");
      });
  })
  .addSubCommand("leave", (sub) => {
    sub.setDescription("Removes entities from their team.")
      .addSelectorOption("members", (opt) => {
        opt.setDescription("The entities to leave their teams");
      });
  })
  .addSubCommand("modify", (sub) => {
    sub.setDescription("Modifies team settings.")
      .addStringOption("team", (opt) => {
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
      })
      .addSubCommand("prefix", "setting", (sub) => {
        sub.setDescription("Modifies the prefix before member's names.")
          .addStringOption("raw json", (opt) => {
            opt.setDescription("The raw JSON text")
              .setDisplayText("raw json")
              .setSnippet("${1:{\"text\":\"example\"\\}}");
          });
      })
      .addSubCommand("suffix", "setting", (sub) => {
        sub.setDescription("Modifies the suffix after member's names.")
          .addStringOption("raw json", (opt) => {
            opt.setDescription("The raw JSON text")
              .setDisplayText("raw json")
              .setSnippet("${1:{\"text\":\"example\"\\}}");
          });
      })
      .addSubCommand("displayName", "setting", (sub) => {
        sub.setDescription("Modifies the team's display name.")
          .addStringOption("raw json", (opt) => {
            opt.setDescription("The raw JSON text")
              .setDisplayText("raw json")
              .setSnippet("${1:{\"text\":\"example\"\\}}");
          });
      });
  });

module.exports = {
  "1.13": {
    name: "team",
    builder: teamCommandBuilder
  }
};