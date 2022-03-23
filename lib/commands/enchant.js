const { stripIndent } = require("common-tags"),
  { CommandBuilder } = require("../class/builders");

const enchantCommandBuilder = new CommandBuilder("enchant")
  .setDescription("Enchants items held in players' hands.")
  .addSelectorOption("targets")
  .addEnchantmentOption("enchantment")
  .addNumberOption("level", (opt) => {
    opt.setOptional()
      .setDescription(stripIndent`
      The level of the enchantent being applied
      - May not work if the level is above the maximum level of the enchantment
      `)
      .setDefaultValue("1")
      .setDisplayText("level");
  });

module.exports = {
  "1.12": {
    name: "enchant",
    builder: enchantCommandBuilder
  }
};