const { CommandBuilder } = require("../class/builders");

const dataCommandBuilder13 = new CommandBuilder("data")
    .setDescription("Interacts with NBT data.")
    .createNamedSection("TARGET", (section) => {
      section.addSubCommand("entity", "target type", (sub) => {
        sub.addSelectorOption(
          "target",
          (opt) => opt.setDescription("The entity whose NBT data will be interacted with")
        );
      })
        .addSubCommand("block", "target type", (sub) => {
          sub.addCoordinateOption("position", 3, (opt) => opt.setDescription(
            "The block position whose NBT data will be interacted with"
          ));
        });
    })
    .addSubCommand("get", "sub command", (sub) => {
      sub.setDescription("Gets NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setOptional()
            .setSnippet("${1:an.example[0].\"path\"}")
            .setDisplayText("path")
            .setDescription("The NBT path to fetch data from");
        })
        .addNumberOption("scale", (opt) => {
          opt.setOptional()
            .setDefaultValue("1")
            .setDisplayText("scale")
            .setDescription("The multiplier to scale the returned number by");
        });
    })
    .addSubCommand("merge", "sub command", (sub) => {
      sub.setDescription("Merges NBT data.")
        .addSectionOption("TARGET")
        .addNBTOption("nbt", (opt) => {
          opt.setDisplayText("nbt")
            .setDescription("The NBT data to merge with the existing NBT data");
        });
    })
    .addSubCommand("remove", "sub command", (sub) => {
      sub.setDescription("Removes NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setOptional()
            .setSnippet("${1:an.example[0].\"path\"}")
            .setDisplayText("path")
            .setDescription("The NBT path to fetch data from");
        });
    }),

  dataCommandBuilder14 = new CommandBuilder("data")
    .setDescription("Interacts with NBT data.")
    .createNamedSection("TARGET", (section) => {
      section.addSubCommand("entity", "target type", (sub) => {
        sub.addSelectorOption(
          "target",
          (opt) => opt.setDescription("The entity whose NBT data will be interacted with")
        );
      })
        .addSubCommand("block", "target type", (sub) => {
          sub.addCoordinateOption("position", 3, (opt) => opt.setDescription(
            "The block position whose NBT data will be interacted with"
          ));
        });
    })
    .createNamedSection("SOURCE", (section) => {
      section.addSubCommand("from", (sub) => {
        sub.setDescription("Grabs source data from a source.")
          .addSectionOption("TARGET")
          .addStringOption("sourcePath", (opt) => {
            opt.setDescription("The source NBT path to fetch data from")
              .setDisplayText("sourcePath")
              .setSnippet("${1:an.example[0].\"path\"}");
          });
      })
        .addSubCommand("value", (sub) => {
          sub.setDescription("Uses a provided source data.")
            .addNBTOption("value", (opt) => {
              opt.setDisplayText("value")
                .setDescription("The NBT data to use as the source data");
            });
        });
    })
    .addSubCommand("get", "sub command", (sub) => {
      sub.setDescription("Gets NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setOptional()
            .setSnippet("${1:an.example[0].\"path\"}")
            .setDisplayText("path")
            .setDescription("The NBT path to fetch data from");
        })
        .addNumberOption("scale", (opt) => {
          opt.setOptional()
            .setDefaultValue("1")
            .setDisplayText("scale")
            .setDescription("The multiplier to scale the returned number by");
        });
    })
    .addSubCommand("merge", "sub command", (sub) => {
      sub.setDescription("Merges NBT data.")
        .addSectionOption("TARGET")
        .addNBTOption("nbt", (opt) => {
          opt.setDisplayText("nbt")
            .setDescription("The NBT data to merge with the existing NBT data");
        });
    })
    .addSubCommand("remove", "sub command", (sub) => {
      sub.setDescription("Removes NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setOptional()
            .setSnippet("${1:an.example[0].\"path\"}")
            .setDisplayText("path")
            .setDescription("The NBT path to fetch data from");
        });
    })
    .addSubCommand("modify", "sub command", (sub) => {
      sub.setDescription("Modifies NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setDescription("The NBT path to modify")
            .setDisplayText("path")
            .setSnippet("${1:an.example[0].\"path\"}");
        })
        .addSubCommand("insert", "modify mode", (sub) => {
          sub.setDescription("Inserts the source data into the specified path list at a specified index.")
            .addNumberOption("index", (opt) => {
              opt.setDescription("The index to insert the data into. Other items in the list will be moved upwards.")
                .setDisplayText("index");
            })
            .addSectionOption("SOURCE");
        })
        .addEnumOption("modify mode", (opt) => {
          opt.addChoice("append", "Appends the source data onto the end of the specified path list.")
            .addChoice("merge", "Merges the source data into the specified path data.")
            .addChoice("prepend", "Prepends the source data at the beginning of the specified path list.")
            .addChoice("set", "Overwrites the data at the specified path with the source data.");
        })
        .addSectionOption("SOURCE");
    }),

  dataCommandBuilder15 = new CommandBuilder("data")
    .setDescription("Interacts with NBT data.")
    .createNamedSection("TARGET", (section) => {
      section.addSubCommand("entity", "target type", (sub) => {
        sub.addSelectorOption(
          "target",
          (opt) => opt.setDescription("The entity whose NBT data will be interacted with")
        );
      })
        .addSubCommand("block", "target type", (sub) => {
          sub.addCoordinateOption("position", 3, (opt) => opt.setDescription(
            "The block position whose NBT data will be interacted with"
          ));
        })
        .addSubCommand("storage", "target type", (sub) => {
          sub.addStringOption("target", (opt) => {
            opt.setDescription("The resource location of a storage")
              .setDisplayText("target")
              .setSnippet("${1:resource_location}");
          });
        });
    })
    .createNamedSection("SOURCE", (section) => {
      section.addSubCommand("from", (sub) => {
        sub.setDescription("Grabs source data from a source.")
          .addSectionOption("TARGET")
          .addStringOption("sourcePath", (opt) => {
            opt.setDescription("The source NBT path to fetch data from")
              .setDisplayText("sourcePath")
              .setSnippet("${1:an.example[0].\"path\"}");
          });
      })
        .addSubCommand("value", (sub) => {
          sub.setDescription("Uses a provided source data.")
            .addNBTOption("value", (opt) => {
              opt.setDisplayText("value")
                .setDescription("The NBT data to use as the source data");
            });
        });
    })
    .addSubCommand("get", "sub command", (sub) => {
      sub.setDescription("Gets NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setOptional()
            .setSnippet("${1:an.example[0].\"path\"}")
            .setDisplayText("path")
            .setDescription("The NBT path to fetch data from");
        })
        .addNumberOption("scale", (opt) => {
          opt.setOptional()
            .setDefaultValue("1")
            .setDisplayText("scale")
            .setDescription("The multiplier to scale the returned number by");
        });
    })
    .addSubCommand("merge", "sub command", (sub) => {
      sub.setDescription("Merges NBT data.")
        .addSectionOption("TARGET")
        .addNBTOption("nbt", (opt) => {
          opt.setDisplayText("nbt")
            .setDescription("The NBT data to merge with the existing NBT data");
        });
    })
    .addSubCommand("remove", "sub command", (sub) => {
      sub.setDescription("Removes NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setOptional()
            .setSnippet("${1:an.example[0].\"path\"}")
            .setDisplayText("path")
            .setDescription("The NBT path to fetch data from");
        });
    })
    .addSubCommand("modify", "sub command", (sub) => {
      sub.setDescription("Modifies NBT data.")
        .addSectionOption("TARGET")
        .addStringOption("path", (opt) => {
          opt.setDescription("The NBT path to modify")
            .setDisplayText("path")
            .setSnippet("${1:an.example[0].\"path\"}");
        })
        .addSubCommand("insert", "modify mode", (sub) => {
          sub.setDescription("Inserts the source data into the specified path list at a specified index.")
            .addNumberOption("index", (opt) => {
              opt.setDescription("The index to insert the data into. Other items in the list will be moved upwards.")
                .setDisplayText("index");
            })
            .addSectionOption("SOURCE");
        })
        .addEnumOption("modify mode", (opt) => {
          opt.addChoice("append", "Appends the source data onto the end of the specified path list.")
            .addChoice("merge", "Merges the source data into the specified path data.")
            .addChoice("prepend", "Prepends the source data at the beginning of the specified path list.")
            .addChoice("set", "Overwrites the data at the specified path with the source data.");
        })
        .addSectionOption("SOURCE");
    });

module.exports = {
  "1.13": {
    name: "data",
    builder: dataCommandBuilder13
  },
  "1.14": {
    name: "data",
    builder: dataCommandBuilder14
  },
  "1.15": {
    name: "data",
    builder: dataCommandBuilder15
  }
};