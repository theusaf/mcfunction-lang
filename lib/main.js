const Provider = require("./provider");

module.exports = {
  config: {
    showNamespace: {
      title: "Show \"minecraft:\"",
      description: "Toggle whether \"minecraft:\" should be prepended to certain item/block/etc names in suggestions.",
      type: "boolean",
      default: true
    },
    version: {
      title: "Minecraft Version",
      description: "Specify the version the autocomplete should apply to. This option does not affect NBT tag and block state suggestions.",
      type: "string",
      default: "latest",
      enum: ["latest", "1.17", "1.16", "1.15", "1.14", "1.13", "1.12"]
    }
  },
  getProvider: () => new Provider
};
