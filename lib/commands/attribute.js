const { CommandBuilder } = require("../class/builders");

const attributeCommandBuilder = new CommandBuilder("attribute")
  .setDescription("Change or read attributes on an entity")
  .addSelectorOption("target", (opt) => {
    opt.setDescription("The entity to target");
  })
  .addAttributeOption("attribute")
  .addSubCommand("get", "sub command", (cmd) => {
    cmd.setDescription("Returns the value of the attribute.")
      .addNumberOption("scale", (opt) => {
        opt.setDefaultValue("1")
          .setDescription("A number to scale the output by")
          .setDisplayText("scale")
          .setOptional();
      });
  })
  .addSubCommand("base", "sub command", (cmd) => {
    cmd.setDescription("Interacts with the attribute base values.")
      .addSubCommand("get", "base mode", (sub) => {
        sub.setDescription("Gets the base of the attribute.")
          .addNumberOption("scale", (opt) => {
            opt.setDefaultValue("1")
              .setDescription("A number to scale the output by")
              .setDisplayText("scale")
              .setOptional();
          });
      })
      .addSubCommand("set", "base mode", (sub) => {
        sub.setDescription("Sets the base of the attribute")
          .addNumberOption("value", (opt) => {
            opt.setDisplayText("value")
              .setDescription("The number to set the attribute base to");
          });
      });
  })
  .addSubCommand("modifier", "sub command", (cmd) => {
    cmd.setDescription("Interacts with the attribute modifier values.")
      .addSubCommand("add", "modifier mode", (sub) => {
        sub.setDescription("Adds a new modifier for the attribute")
          .addStringOption("uuid", (opt) => {
            opt.setDescription("The UUID of the attribbute modifier")
              .setDisplayText("uuid")
              .setSnippet("${1:uuid}");
          })
          .addStringOption("name", (opt) => {
            opt.setDescription("The name of the attribute modifier")
              .setDisplayText("name")
              .setSnippet("${1:name}");
          })
          .addNumberOption("value", (opt) => {
            opt.setDescription("The numerical value of the modifier")
              .setDefaultValue("1")
              .setDisplayText("value");
          })
          .addEnumOption("modifier type", (opt) => {
            opt.addChoice("add", "Adds a value to the total.")
              .addChoice("multiply", "Multiplies the total.")
              .addChoice("multiple_base", "Multiplies the base.");
          });
      })
      .addSubCommand("remove", "modifier mode", (sub) => {
        sub.setDescription("Removes an attribute modifier.")
          .addStringOption("uuid", (opt) => {
            opt.setDescription("The UUID of the attribute modifier")
              .setDisplayText("uuid")
              .setSnippet("${1:uuid}");
          });
      })
      .addSubCommand("value", "modifier mode", (sub) => {
        sub.setDescription("Interacts with the values of the attribute modifiers")
          .addStringOption("value mode", (opt) => {
            opt.setText("get")
              .setDescription("Gets the values of the attribute modifier");
          })
          .addStringOption("uuid", (opt) => {
            opt.setDescription("The UUID of the attribute modifier")
              .setDisplayText("uuid")
              .setSnippet("${1:uuid}");
          })
          .addNumberOption("scale", (opt) => {
            opt.setDefaultValue("1")
              .setDescription("A number to scale the output by")
              .setDisplayText("scale")
              .setOptional();
          });
      });
  });

module.exports = {
  "1.16": {
    name: "attribute",
    builder: attributeCommandBuilder
  }
};