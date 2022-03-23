const { CommandBuilder } = require("../class/builders");

const executeCommandBuilder12 = new CommandBuilder("execute")
    .setDescription("Executes commands as entities at various locations.")
    .addSelectorOption("targets", (opt) => {
      opt.setDescription("The targets to run the command as");
    })
    .addStringOption("execute position", (opt) => {
      opt.setText("~ ~ ~ detect")
        .setDescription("Checks for a block as a condition before executing the command.")
        .setDisplayText("~ ~ ~ detect ...")
        .setOptional()
        .setParallel();
    })
    .addCoordinateOption("execute position", 3, (opt) => {
      opt.setDescription("The position relative to the executor where the command will be executed");
    })
    .addSubCommand("detect", "detect condition", (sub) => {
      sub.setDescription("Checks for a block as a condition before executing the command.")
        .addCoordinateOption("detect position", 3, (opt) => {
          opt.setDescription("The position relative to the execute location to check for the block");
        })
        .addBlockOption("block")
        .addStringOption("state", (opt) => {
          opt.setDescription("The variant or block state to check for")
            .setDisplayText("state")
            .setSnippet("${1:state}");
        });
    }),

  executeCommandBuilder13 = new CommandBuilder("execute")
    .setDescription("Executes commands as entities at various locations under various conditions.")
    .createNamedSection("IF_UNLESS", (section) => {
      section.addSubCommand("block", (sub) => {
        sub.setDescription("Tests a single block.")
          .addCoordinateOption("position", 3, (opt) => {
            opt.setDescription("The position of the block to test");
          })
          .addBlockOption("block")
          .addSectionOption((section) => {
            if (section.getPreviousToken() !== "run") {
              section.addSectionOption("EXECUTE");
            }
          });
      })
        .addSubCommand("blocks", (sub) => {
          sub.setDescription("Tests an area of blocks.")
            .addCoordinateOption("start", 3, (opt) => {
              opt.setDescription("First corner of source area");
            })
            .addCoordinateOption("end", 3, (opt) => {
              opt.setDescription("Second corner of source area");
            })
            .addCoordinateOption("destination", 3, (opt) => {
              opt.setDescription("Position of the lower northwest corner of the destination area to be compared with the source");
            })
            .addEnumOption("scan mode", (opt) => {
              opt.addChoice("all", "Specifies that all blocks are compared.")
                .addChoice("masked", "Specifies that the blocks are compared, ignoring air.");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("entity", (sub) => {
          sub.setDescription("Checks for one or more entities.")
            .addSelectorOption("targets")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("score", (sub) => {
          sub.setDescription("Tests whether a score value meets certain conditions.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The single score holder to check");
              // TODO: check if "*" is a valid value here
            })
            .addStringOption("targetObjective", (opt) => {
              opt.setDescription("The scoreboard objective to check in")
                .setDisplayText("target objective")
                .setSnippet("${1:objective}");
            })
            .addSubCommand("matches", "comparison type", (sub) => {
              sub.setDescription("Uses a range to compare with the score.")
                .addStringOption("range", (opt) => {
                  opt.setDescription("A range of integers (e.g.: 1..10)")
                    .setDisplayText("range")
                    .setSnippet("${1..10}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addEnumOption("comparison type", (opt) => {
              opt.addChoice("<", "less than")
                .addChoice("<=", "less than or equal to")
                .addChoice("=", "equal to")
                .addChoice(">=", "greater than or equal to")
                .addChoice(">", "greater than");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        });
    })
    .createNamedSection("EXECUTE", (section) => {
      section.addSubCommand("align", (sub) => {
        sub.setDescription("Updates the execution position to the current block position for certain axis.")
          .addEnumOption("axes", (opt) => {
            const axes = ["x","y","z","xy","yx","xz","zx","yz","zy","xyz","yxz","zyx","zxy","xzy"];
            for (const axis of axes) {
              opt.addChoice(axis);
            }
          })
          .addSectionOption((section) => {
            if (section.getPreviousToken() !== "run") {
              section.addSectionOption("EXECUTE");
            }
          });
      })
        .addSubCommand("anchored", (sub) => {
          sub.setDescription("Sets the execution anchor to the eyes or feet, recentering the local coordinates to the eyes or feet.")
            .addEnumOption("anchor", (opt) => {
              opt.addChoice("eyes", "Positions and rotates locally by the eyes of the executor.")
                .addChoice("feet", "Positions and rotates locally by the feet of the executor.");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("as", (sub) => {
          sub.setDescription("Sets the command's executors to the entities.")
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The target(s) entities to become the executor of the command");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("at", (sub) => {
          sub.setDescription("Sets the command's execution location to the location of entities.")
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The target(s) entities to position the command to");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("facing", (sub) => {
          sub.setDescription("Sets the execution rotation to face a given point.")
            .addSubCommand("entity", (sub) => {
              sub.setDescription("Specifies an entity to face towards.")
                .addSelectorOption("targets", (opt) => {
                  opt.setDescription("The target(s) to face towards");
                })
                .addEnumOption("anchor", (opt) => {
                  opt.addChoice("eyes", "Points toward the eyes.")
                    .addChoice("feet", "Points toward the feet.");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addCoordinateOption("position", 3, (opt) => {
              opt.setDescription("The position to face towards");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("in", (sub) => {
          sub.setDescription("Sets the execution dimension and scales the position accordingly.")
            .addDimensionOption("dimension")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("positioned", (sub) => {
          sub.setDescription("Sets the execution position, can match an entity's position.")
            .addSubCommand("as", (sub) => {
              sub.setDescription("Positions at an entity's position.")
                .addSelectorOption("targets");
            })
            .addCoordinateOption("position", 3)
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("rotated", (sub) => {
          sub.setDescription("Sets the execution rotation, can match an entity's rotation.")
            .addSubCommand("as", (sub) => {
              sub.setDescription("Rotates at an entity's rotation.")
                .addSelectorOption("targets");
            })
            .addCoordinateOption("rotation", 2, (opt) => {
              opt.setDescription("The yaw and pitch of the rotation");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("store", (sub) => {
          sub.setDescription("Stores the result/success code of the command.")
            .addEnumOption("store type", (opt) => {
              opt.addChoice("result", "Stores the result of the command.")
                .addChoice("success", "Stores the success of the command.");
            })
            .addSubCommand("block", "store type", (sub) => {
              sub.setDescription("Stores the result in a block.")
                .addCoordinateOption("targetPosition", 3)
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setDescription("The NBT path location to store the data in")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("bossbar", "store type", (sub) => {
              sub.setDescription("Stores the result in a bossbar.")
                .addStringOption("id", (opt) => {
                  opt.setDisplayText("id")
                    .setDescription("The ID of a bossbar to save the data in")
                    .setSnippet("${1:id}");
                })
                .addEnumOption("value", (opt) => {
                  opt.addChoice("value", "Stores the result in the bossbar's value.")
                    .addChoice("max", "Stores the result in the bossbar's max value.");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("entity", "store type", (sub) => {
              sub.setDescription("Stores the result in an entity.")
                .addSelectorOption("target", (opt) => {
                  opt.setDescription("A single entity to store the data in");
                })
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setDescription("The NBT path location to store the data in")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("score", "store type", (sub) => {
              sub.setDescription("Stores the result in a scoreboard objective.")
                .addSelectorOption("targets", (opt) => {
                  opt.setDescription("Specifies the score holders to overwrite scores in");
                })
                .addStringOption("objective", (opt) => {
                  opt.setDisplayText("objective")
                    .setDescription("The id of the objective to store the results in")
                    .setSnippet("${1:objective_name}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            });
        })
        .addSubCommand("if", (sub) => {
          sub.setDescription("Checks if a condition is true.")
            .addSectionOption("IF_UNLESS")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("unless", (sub) => {
          sub.setDescription("Checks if a condition is false.")
            .addSectionOption("IF_UNLESS")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("run", (sub) => {
          sub.setDescription("End the execute command.");
        });
    })
    .addSectionOption("EXECUTE"),

  executeCommandBuilder14 = new CommandBuilder("execute")
    .setDescription("Executes commands as entities at various locations under various conditions.")
    .createNamedSection("IF_UNLESS", (section) => {
      section.addSubCommand("block", (sub) => {
        sub.setDescription("Tests a single block.")
          .addCoordinateOption("position", 3, (opt) => {
            opt.setDescription("The position of the block to test");
          })
          .addBlockOption("block")
          .addSectionOption((section) => {
            if (section.getPreviousToken() !== "run") {
              section.addSectionOption("EXECUTE");
            }
          });
      })
        .addSubCommand("blocks", (sub) => {
          sub.setDescription("Tests an area of blocks.")
            .addCoordinateOption("start", 3, (opt) => {
              opt.setDescription("First corner of source area");
            })
            .addCoordinateOption("end", 3, (opt) => {
              opt.setDescription("Second corner of source area");
            })
            .addCoordinateOption("destination", 3, (opt) => {
              opt.setDescription("Position of the lower northwest corner of the destination area to be compared with the source");
            })
            .addEnumOption("scan mode", (opt) => {
              opt.addChoice("all", "Specifies that all blocks are compared.")
                .addChoice("masked", "Specifies that the blocks are compared, ignoring air.");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("entity", (sub) => {
          sub.setDescription("Checks for one or more entities.")
            .addSelectorOption("targets")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("score", (sub) => {
          sub.setDescription("Tests whether a score value meets certain conditions.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The single score holder to check");
              // TODO: check if "*" is a valid value here
            })
            .addStringOption("targetObjective", (opt) => {
              opt.setDescription("The scoreboard objective to check in")
                .setDisplayText("target objective")
                .setSnippet("${1:objective}");
            })
            .addSubCommand("matches", "comparison type", (sub) => {
              sub.setDescription("Uses a range to compare with the score.")
                .addStringOption("range", (opt) => {
                  opt.setDescription("A range of integers (e.g.: 1..10)")
                    .setDisplayText("range")
                    .setSnippet("${1..10}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addEnumOption("comparison type", (opt) => {
              opt.addChoice("<", "less than")
                .addChoice("<=", "less than or equal to")
                .addChoice("=", "equal to")
                .addChoice(">=", "greater than or equal to")
                .addChoice(">", "greater than");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("data", (sub) => {
          sub.setDescription("Checks whether a data path exists.")
            .addSubCommand("block", "data source", (sub) => {
              sub.addCoordinateOption("position", 3)
                .addStringOption("path", (opt) => {
                  opt.setDescription("The path to check")
                    .setDisplayText("path")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("entity", "data source", (sub) => {
              sub
                .addSelectorOption("target")
                .addStringOption("path", (opt) => {
                  opt.setDescription("The path to check")
                    .setDisplayText("path")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            });
        });
    })
    .createNamedSection("EXECUTE", (section) => {
      section.addSubCommand("align", (sub) => {
        sub.setDescription("Updates the execution position to the current block position for certain axis.")
          .addEnumOption("axes", (opt) => {
            const axes = ["x","y","z","xy","yx","xz","zx","yz","zy","xyz","yxz","zyx","zxy","xzy"];
            for (const axis of axes) {
              opt.addChoice(axis);
            }
          })
          .addSectionOption((section) => {
            if (section.getPreviousToken() !== "run") {
              section.addSectionOption("EXECUTE");
            }
          });
      })
        .addSubCommand("anchored", (sub) => {
          sub.setDescription("Sets the execution anchor to the eyes or feet, recentering the local coordinates to the eyes or feet.")
            .addEnumOption("anchor", (opt) => {
              opt.addChoice("eyes", "Positions and rotates locally by the eyes of the executor.")
                .addChoice("feet", "Positions and rotates locally by the feet of the executor.");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("as", (sub) => {
          sub.setDescription("Sets the command's executors to the entities.")
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The target(s) entities to become the executor of the command");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("at", (sub) => {
          sub.setDescription("Sets the command's execution location to the location of entities.")
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The target(s) entities to position the command to");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("facing", (sub) => {
          sub.setDescription("Sets the execution rotation to face a given point.")
            .addSubCommand("entity", (sub) => {
              sub.setDescription("Specifies an entity to face towards.")
                .addSelectorOption("targets", (opt) => {
                  opt.setDescription("The target(s) to face towards");
                })
                .addEnumOption("anchor", (opt) => {
                  opt.addChoice("eyes", "Points toward the eyes.")
                    .addChoice("feet", "Points toward the feet.");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addCoordinateOption("position", 3, (opt) => {
              opt.setDescription("The position to face towards");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("in", (sub) => {
          sub.setDescription("Sets the execution dimension and scales the position accordingly.")
            .addDimensionOption("dimension")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("positioned", (sub) => {
          sub.setDescription("Sets the execution position, can match an entity's position.")
            .addSubCommand("as", (sub) => {
              sub.setDescription("Positions at an entity's position.")
                .addSelectorOption("targets");
            })
            .addCoordinateOption("position", 3)
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("rotated", (sub) => {
          sub.setDescription("Sets the execution rotation, can match an entity's rotation.")
            .addSubCommand("as", (sub) => {
              sub.setDescription("Rotates at an entity's rotation.")
                .addSelectorOption("targets");
            })
            .addCoordinateOption("rotation", 2, (opt) => {
              opt.setDescription("The yaw and pitch of the rotation");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("store", (sub) => {
          sub.setDescription("Stores the result/success code of the command.")
            .addEnumOption("store type", (opt) => {
              opt.addChoice("result", "Stores the result of the command.")
                .addChoice("success", "Stores the success of the command.");
            })
            .addSubCommand("block", "store type", (sub) => {
              sub.setDescription("Stores the result in a block.")
                .addCoordinateOption("targetPosition", 3)
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setDescription("The NBT path location to store the data in")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("bossbar", "store type", (sub) => {
              sub.setDescription("Stores the result in a bossbar.")
                .addStringOption("id", (opt) => {
                  opt.setDisplayText("id")
                    .setDescription("The ID of a bossbar to save the data in")
                    .setSnippet("${1:id}");
                })
                .addEnumOption("value", (opt) => {
                  opt.addChoice("value", "Stores the result in the bossbar's value.")
                    .addChoice("max", "Stores the result in the bossbar's max value.");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("entity", "store type", (sub) => {
              sub.setDescription("Stores the result in an entity.")
                .addSelectorOption("target", (opt) => {
                  opt.setDescription("A single entity to store the data in");
                })
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setDescription("The NBT path location to store the data in")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("score", "store type", (sub) => {
              sub.setDescription("Stores the result in a scoreboard objective.")
                .addSelectorOption("targets", (opt) => {
                  opt.setDescription("Specifies the score holders to overwrite scores in");
                })
                .addStringOption("objective", (opt) => {
                  opt.setDisplayText("objective")
                    .setDescription("The id of the objective to store the results in")
                    .setSnippet("${1:objective_name}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            });
        })
        .addSubCommand("if", (sub) => {
          sub.setDescription("Checks if a condition is true.")
            .addSectionOption("IF_UNLESS")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("unless", (sub) => {
          sub.setDescription("Checks if a condition is false.")
            .addSectionOption("IF_UNLESS")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("run", (sub) => {
          sub.setDescription("End the execute command.");
        });
    })
    .addSectionOption("EXECUTE"),

  executeCommandBuilder15 = new CommandBuilder("execute")
    .setDescription("Executes commands as entities at various locations under various conditions.")
    .createNamedSection("IF_UNLESS", (section) => {
      section.addSubCommand("block", (sub) => {
        sub.setDescription("Tests a single block.")
          .addCoordinateOption("position", 3, (opt) => {
            opt.setDescription("The position of the block to test");
          })
          .addBlockOption("block")
          .addSectionOption((section) => {
            if (section.getPreviousToken() !== "run") {
              section.addSectionOption("EXECUTE");
            }
          });
      })
        .addSubCommand("blocks", (sub) => {
          sub.setDescription("Tests an area of blocks.")
            .addCoordinateOption("start", 3, (opt) => {
              opt.setDescription("First corner of source area");
            })
            .addCoordinateOption("end", 3, (opt) => {
              opt.setDescription("Second corner of source area");
            })
            .addCoordinateOption("destination", 3, (opt) => {
              opt.setDescription("Position of the lower northwest corner of the destination area to be compared with the source");
            })
            .addEnumOption("scan mode", (opt) => {
              opt.addChoice("all", "Specifies that all blocks are compared.")
                .addChoice("masked", "Specifies that the blocks are compared, ignoring air.");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("entity", (sub) => {
          sub.setDescription("Checks for one or more entities.")
            .addSelectorOption("targets")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("score", (sub) => {
          sub.setDescription("Tests whether a score value meets certain conditions.")
            .addSelectorOption("target", (opt) => {
              opt.setDescription("The single score holder to check");
              // TODO: check if "*" is a valid value here
            })
            .addStringOption("targetObjective", (opt) => {
              opt.setDescription("The scoreboard objective to check in")
                .setDisplayText("target objective")
                .setSnippet("${1:objective}");
            })
            .addSubCommand("matches", "comparison type", (sub) => {
              sub.setDescription("Uses a range to compare with the score.")
                .addStringOption("range", (opt) => {
                  opt.setDescription("A range of integers (e.g.: 1..10)")
                    .setDisplayText("range")
                    .setSnippet("${1..10}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addEnumOption("comparison type", (opt) => {
              opt.addChoice("<", "less than")
                .addChoice("<=", "less than or equal to")
                .addChoice("=", "equal to")
                .addChoice(">=", "greater than or equal to")
                .addChoice(">", "greater than");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("data", (sub) => {
          sub.setDescription("Checks whether a data path exists.")
            .addSubCommand("block", "data source", (sub) => {
              sub.addCoordinateOption("position", 3)
                .addStringOption("path", (opt) => {
                  opt.setDescription("The path to check")
                    .setDisplayText("path")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("entity", "data source", (sub) => {
              sub.addSelectorOption("target")
                .addStringOption("path", (opt) => {
                  opt.setDescription("The path to check")
                    .setDisplayText("path")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("storage", "data source", (sub) => {
              sub.addStringOption("source", (opt) => {
                opt.setDescription("The storage location to use as the source")
                  .setDisplayText("source")
                  .setSnippet("${1:storage_location}");
              })
                .addStringOption("path", (opt) => {
                  opt.setDescription("The path to check")
                    .setDisplayText("path")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            });
        })
        .addSubCommand("predicate", (sub) => {
          sub.setDescription("Checks whether the predicate evaluates to a positive result.")
            .addStringOption("predicate", (opt) => {
              opt.setDisplayText("predicate")
                .setDescription("The predicate to be checked")
                .setSnippet("${1:predicate_location}");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        });
    })
    .createNamedSection("EXECUTE", (section) => {
      section.addSubCommand("align", (sub) => {
        sub.setDescription("Updates the execution position to the current block position for certain axis.")
          .addEnumOption("axes", (opt) => {
            const axes = ["x","y","z","xy","yx","xz","zx","yz","zy","xyz","yxz","zyx","zxy","xzy"];
            for (const axis of axes) {
              opt.addChoice(axis);
            }
          })
          .addSectionOption((section) => {
            if (section.getPreviousToken() !== "run") {
              section.addSectionOption("EXECUTE");
            }
          });
      })
        .addSubCommand("anchored", (sub) => {
          sub.setDescription("Sets the execution anchor to the eyes or feet, recentering the local coordinates to the eyes or feet.")
            .addEnumOption("anchor", (opt) => {
              opt.addChoice("eyes", "Positions and rotates locally by the eyes of the executor.")
                .addChoice("feet", "Positions and rotates locally by the feet of the executor.");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("as", (sub) => {
          sub.setDescription("Sets the command's executors to the entities.")
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The target(s) entities to become the executor of the command");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("at", (sub) => {
          sub.setDescription("Sets the command's execution location to the location of entities.")
            .addSelectorOption("targets", (opt) => {
              opt.setDescription("The target(s) entities to position the command to");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("facing", (sub) => {
          sub.setDescription("Sets the execution rotation to face a given point.")
            .addSubCommand("entity", (sub) => {
              sub.setDescription("Specifies an entity to face towards.")
                .addSelectorOption("targets", (opt) => {
                  opt.setDescription("The target(s) to face towards");
                })
                .addEnumOption("anchor", (opt) => {
                  opt.addChoice("eyes", "Points toward the eyes.")
                    .addChoice("feet", "Points toward the feet.");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addCoordinateOption("position", 3, (opt) => {
              opt.setDescription("The position to face towards");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("in", (sub) => {
          sub.setDescription("Sets the execution dimension and scales the position accordingly.")
            .addDimensionOption("dimension")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("positioned", (sub) => {
          sub.setDescription("Sets the execution position, can match an entity's position.")
            .addSubCommand("as", (sub) => {
              sub.setDescription("Positions at an entity's position.")
                .addSelectorOption("targets");
            })
            .addCoordinateOption("position", 3)
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("rotated", (sub) => {
          sub.setDescription("Sets the execution rotation, can match an entity's rotation.")
            .addSubCommand("as", (sub) => {
              sub.setDescription("Rotates at an entity's rotation.")
                .addSelectorOption("targets");
            })
            .addCoordinateOption("rotation", 2, (opt) => {
              opt.setDescription("The yaw and pitch of the rotation");
            })
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("store", (sub) => {
          sub.setDescription("Stores the result/success code of the command.")
            .addEnumOption("store type", (opt) => {
              opt.addChoice("result", "Stores the result of the command.")
                .addChoice("success", "Stores the success of the command.");
            })
            .addSubCommand("block", "store type", (sub) => {
              sub.setDescription("Stores the result in a block.")
                .addCoordinateOption("targetPosition", 3)
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setDescription("The NBT path location to store the data in")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("bossbar", "store type", (sub) => {
              sub.setDescription("Stores the result in a bossbar.")
                .addStringOption("id", (opt) => {
                  opt.setDisplayText("id")
                    .setDescription("The ID of a bossbar to save the data in")
                    .setSnippet("${1:id}");
                })
                .addEnumOption("value", (opt) => {
                  opt.addChoice("value", "Stores the result in the bossbar's value.")
                    .addChoice("max", "Stores the result in the bossbar's max value.");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("entity", "store type", (sub) => {
              sub.setDescription("Stores the result in an entity.")
                .addSelectorOption("target", (opt) => {
                  opt.setDescription("A single entity to store the data in");
                })
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setDescription("The NBT path location to store the data in")
                    .setSnippet("${1:an.example[0].\"path\"}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("score", "store type", (sub) => {
              sub.setDescription("Stores the result in a scoreboard objective.")
                .addSelectorOption("targets", (opt) => {
                  opt.setDescription("Specifies the score holders to overwrite scores in");
                })
                .addStringOption("objective", (opt) => {
                  opt.setDisplayText("objective")
                    .setDescription("The id of the objective to store the results in")
                    .setSnippet("${1:objective_name}");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            })
            .addSubCommand("storage", "store type", (sub) => {
              sub.setDescription("Stores the result in a command storage")
                .addStringOption("target", (opt) => {
                  opt.setDescription("The storage container location")
                    .setDisplayText("target")
                    .setSnippet("${1:storage_location}");
                })
                .addStringOption("path", (opt) => {
                  opt.setDisplayText("path")
                    .setSnippet("${1:path}");
                })
                .addEnumOption("type", (opt) => {
                  opt.addChoice("byte")
                    .addChoice("short")
                    .addChoice("int")
                    .addChoice("long")
                    .addChoice("float")
                    .addChoice("double");
                })
                .addNumberOption("scale", (opt) => {
                  opt.setDescription("The scalar to multiply the output by")
                    .setDisplayText("scale")
                    .setDefaultValue("1.0");
                })
                .addSectionOption((section) => {
                  if (section.getPreviousToken() !== "run") {
                    section.addSectionOption("EXECUTE");
                  }
                });
            });
        })
        .addSubCommand("if", (sub) => {
          sub.setDescription("Checks if a condition is true.")
            .addSectionOption("IF_UNLESS")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("unless", (sub) => {
          sub.setDescription("Checks if a condition is false.")
            .addSectionOption("IF_UNLESS")
            .addSectionOption((section) => {
              if (section.getPreviousToken() !== "run") {
                section.addSectionOption("EXECUTE");
              }
            });
        })
        .addSubCommand("run", (sub) => {
          sub.setDescription("End the execute command.");
        });
    })
    .addSectionOption("EXECUTE");

module.exports = {
  "1.12": {
    name: "execute",
    builder: executeCommandBuilder12
  },
  "1.13": {
    name: "execute",
    builder: executeCommandBuilder13
  },
  "1.14": {
    name: "execute",
    builder: executeCommandBuilder14
  },
  "1.15": {
    name: "execute",
    builder: executeCommandBuilder15
  }
};