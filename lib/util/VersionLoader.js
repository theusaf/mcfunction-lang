/* global atom */
const VERSIONS = require("../data/versions.json"),
  IDS = [
    "advancement",
    "biomes",
    "block",
    "effect",
    "enchantment",
    "entity",
    "gamerule",
    "item",
    "loot_table",
    "particle",
    "recipe",
    "slot",
    "sounds",
    "structures",
    "features",
    "tag"
  ];

/**
 * Represents the loader of version data.
 */
class VersionLoader {

  constructor() {
    /**
     * @type {Object.<string, string[]>}
     */
    this.ids = {};
    this.version = null;
    atom.config.observe("mcfunction-lang.version", (version) => {this.updateIDs(version);});
  }

  /**
   * Updates the data to the latest version.
   * 
   * @param {String} currentVersion The current version being used
   */
  updateIDs(currentVersion) {
    if (currentVersion === "latest") {currentVersion = VERSIONS[VERSIONS.length - 1];}
    this.ids = {};
    this.version = currentVersion;
    for (const version of VERSIONS) {
      for (const id of IDS) {
        this.ids[id] = this.ids[id] ?? new Set;
        const data = require(`../data/versions/${version}/${id}`),
          add = data.add ?? {},
          remove = data.remove ?? {};
        if (Array.isArray(add)) {
          for (const item of add) {this.ids[id].add(item);}
        } else {
          this.ids[id] = this.ids[id] ?? {};
          for (const key in add) {
            this.ids[id][key] = this.ids[id][key] ?? new Set;
            for (const item of add[key]) {this.ids[id][key].add(item);}
          }
        }
        if (Array.isArray(remove)) {
          for (const item of remove) {this.ids[id].delete(item);}
        } else {
          for (const key in remove) {
            for (const item of remove[key]) {this.ids[id].delete(item);}
          }
        }
      }
      if (currentVersion === version) {break;}
    }
    const {slot, item:items, entity:entities} = this.ids,
      {objective:objectives} = slot;
    // Add items and entities to objectives
    for (const objective of objectives) {
      if (/<item>/.test(objective)) {
        objectives.delete(objective);
        for (const item of items) {
          objectives.add(objective.replace(/<item>/, item));
        }
      }
      if (/<entity>/.test(objective)) {
        objectives.delete(objective);
        for (const entity of entities) {
          objectives.add(objective.replace(/<entity>/, entity));
        }
      }
    }
  }

  /**
   * Returns the current version being used.
   * 
   * @returns {String} The current version
   */
  getVersion() {
    return this.version;
  }
}

module.exports = new VersionLoader;
