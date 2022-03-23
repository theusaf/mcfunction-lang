const hasProperty = require("../../util/hasProperty"),
  BaseOption = require("../BaseOption"),
  EnumOption = require("./EnumOption"),
  NumberOption = require("./NumberOption"),
  SelectorOption = require("./SelectorOption"),
  ItemOption = require("./ItemOption"),
  NBTOption = require("./NBTOption"),
  range = require("../../util/range"),
  AdvancementOption = require("./AdvancementOption"),
  AttributeOption = require("./AttributeOption"),
  BiomeOption = require("./BiomeOption"),
  BlockOption = require("./BlockOption"),
  BooleanOption = require("./BooleanOption"),
  CoordinateOption = require("./CoordinateOption"),
  DimensionOption = require("./DimensionOption"),
  EffectOption = require("./EffectOption"),
  EnchantmentOption = require("./EnchantmentOption"),
  EntityOption = require("./EntityOption"),
  GameruleOption = require("./GameruleOption"),
  LootTableOption = require("./LootTableOption"),
  ObjectiveOption = require("./ObjectiveOption"),
  ParticleOption = require("./ParticleOption"),
  RecipeOption = require("./RecipeOption"),
  ScoreboardDisplayOption = require("./ScoreboardDisplayOption"),
  SlotOption = require("./SlotOption"),
  SoundOption = require("./SoundOption"),
  StructureOption = require("./StructureOption"),
  StringOption = require("./StringOption"),
  FeatureOption = require("./FeatureOption");

/**
 * @template T
 * @callback optionCallback
 * @param {T} option
 */
/**
 * @callback optionCallbackSection
 * @param {Section} option
 */
/**
 * @callback sectionGenerator
 * @param {Section|null} parent
 * @returns {BaseOption}
 */

/**
 * Represents a section, which can contain options
 */
class Section extends BaseOption {

  /**
     * The named sections of this section
     * 
     * @type {Object.<string, Section>}
     */
  namedSections = {};

  /**
   * The paths this section can take
   * Contains functions that will return the option
   * 
   * @type {sectionGenerator[]}
   */
  path = [];

  /**
   * The other sections in this section.
   * 
   * @type {Section[]}
   */
  _sectionChildren = [];

  /**
   * The tokens in the current string
   * Should be updated through the CommandHandler
   * 
   * @type {String[]}
   */
  _tokens = [];

  /**
   * The current token being processed
   * Should be updated through the CommandHandler
   */
  _previousToken = "";

  /**
   * Adds a sub command to this section's path.
   * 
   * @param {String} name The name of the sub command
   * @param {String|optionCallbackSection} label The label of the sub command
   * @param {optionCallbackSection} subCommandCallback The function to handle the sub command
   */
  addSubCommand(name, label, subCommandCallback) {
    if (typeof label === "function") {
      subCommandCallback = label;
      label = null;
    }
    const SubCommandSection = require("./SubCommandSection"),
      subCommand = new SubCommandSection(name, label);
    this._addSectionCallbackOptionToPath(subCommand, subCommandCallback);
    return this;
  }

  /**
   * Adds a number option to this section's path.
   * 
   * @param {String} label The label of the number option
   * @param {optionCallback<NumberOption>} numberCallback The function to handle the number option
   */
  addNumberOption(label, numberCallback) {
    const numberOption = new NumberOption(label);
    this._addCallbackOptionToPath(numberOption, numberCallback);
    return this;
  }

  /**
   * Adds a string option to this section's path.
   * 
   * @param {String} label The label of the string option
   * @param {optionCallback<StringOption>} stringCallback The function to handle the string option
   */
  addStringOption(label, stringCallback) {
    const stringOption = new StringOption(label);
    this._addCallbackOptionToPath(stringOption, stringCallback);
    return this;
  }

  /**
   * Adds an NBT option to this section's path.
   * 
   * @param {String} label The label of the NBT option
   * @param {optionCallback<NBTOption>} nbtCallback The function to handle the NBT option
   */
  addNBTOption(label, nbtCallback) {
    const nbtOption = new NBTOption(label);
    this._addCallbackOptionToPath(nbtOption, nbtCallback);
    return this;
  }

  /**
   * Adds an enum option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<EnumOption>} enumCallback The function to handle the enum option
   */
  addEnumOption(label, enumCallback) {
    const enumOption = new EnumOption(label);
    this._addCallbackOptionToPath(enumOption, enumCallback);
    return this;
  }

  /**
   * Adds a selector option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<SelectorOption>} selectorCallback The function to handle the selector option
   */
  addSelectorOption(label, selectorCallback) {
    const selectorOption = new SelectorOption(label);
    this._addCallbackOptionToPath(selectorOption, selectorCallback);
    return this;
  }

  /**
   * Adds an item option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<ItemOption>} itemCallback The function to handle the item option
   */
  addItemOption(label, itemCallback) {
    const itemOption = new ItemOption(label);
    this._addCallbackOptionToPath(itemOption, itemCallback);
    return this;
  }

  /**
   * Adds an advancement option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<AdvancementOption>} advancementCallback The function to handle the advancement option
   */
  addAdvancementOption(label, advancementCallback) {
    const advancementOption = new AdvancementOption(label);
    this._addCallbackOptionToPath(advancementOption, advancementCallback);
    return this;
  }

  /**
   * Adds a block option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<BlockOption>} blockCallback The function to handle the block option
   */
  addBlockOption(label, blockCallback) {
    const blockOption = new BlockOption(label);
    this._addCallbackOptionToPath(blockOption, blockCallback);
    return this;
  }

  /**
   * Adds a dimension option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<DimensionOption>} dimensionCallback The function to handle the dimension option
   */
  addDimensionOption(label, dimensionCallback) {
    const dimensionOption = new DimensionOption(label);
    this._addCallbackOptionToPath(dimensionOption, dimensionCallback);
    return this;
  }

  /**
   * Adds an effect option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<EffectOption>} effectCallback The function to handle the effect option
   */
  addEffectOption(label, effectCallback) {
    const effectOption = new EffectOption(label);
    this._addCallbackOptionToPath(effectOption, effectCallback);
    return this;
  }

  /**
   * Adds an enchantment option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<EnchantmentOption>} enchantmentCallback The function to handle the enchantment option
   */
  addEnchantmentOption(label, enchantmentCallback) {
    const enchantmentOption = new EnchantmentOption(label);
    this._addCallbackOptionToPath(enchantmentOption, enchantmentCallback);
    return this;
  }

  /**
   * Adds an entity option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<EntityOption>} entityCallback The function to handle the entity option
   */
  addEntityOption(label, entityCallback) {
    const entityOption = new EntityOption(label);
    this._addCallbackOptionToPath(entityOption, entityCallback);
    return this;
  }

  /**
   * Adds a feature option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<FeatureOption>} featureCallback The function to handle the feature option
   */
  addFeatureOption(label, featureCallback) {
    const featureOption = new FeatureOption(label);
    this._addCallbackOptionToPath(featureOption, featureCallback);
    return this;
  }

  /**
   * Adds a recipe option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<RecipeOption>} recipeCallback The function to handle the recipe option
   */
  addRecipeOption(label, recipeCallback) {
    const recipeOption = new RecipeOption(label);
    this._addCallbackOptionToPath(recipeOption, recipeCallback);
    return this;
  }

  /**
   * Adds a sound option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<SoundOption>} soundCallback The function to handle the sound option
   */
  addSoundOption(label, soundCallback) {
    const soundOption = new SoundOption(label);
    this._addCallbackOptionToPath(soundOption, soundCallback);
    return this;
  }

  /**
   * Adds an attribute option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<AttributeOption>} attributeCallback The function to handle the attribute option
   */
  addAttributeOption(label, attributeCallback) {
    const attributeOption = new AttributeOption(label);
    this._addCallbackOptionToPath(attributeOption, attributeCallback);
    return this;
  }

  /**
   * Adds a biome option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<BiomeOption>} biomeCallback The function to handle the biome option
   */
  addBiomeOption(label, biomeCallback) {
    const biomeOption = new BiomeOption(label);
    this._addCallbackOptionToPath(biomeOption, biomeCallback);
    return this;
  }

  /**
   * Adds a gamerule option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<GameruleOption>} gameruleCallback The function to handle the gamerule option
   */
  addGameruleOption(label, gameruleCallback) {
    const gameruleOption = new GameruleOption(label);
    this._addCallbackOptionToPath(gameruleOption, gameruleCallback);
    return this;
  }

  /**
   * Adds a loot table option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<LootTableOption>} lootTableCallback The function to handle the loot table option
   */
  addLootTableOption(label, lootTableCallback) {
    const lootTableOption = new LootTableOption(label);
    this._addCallbackOptionToPath(lootTableOption, lootTableCallback);
    return this;
  }

  /**
   * Adds an objective option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<ObjectiveOption>} objectiveCallback The function to handle the objective option
   */
  addObjectiveOption(label, objectiveCallback) {
    const objectionOption = new ObjectiveOption(label);
    this._addCallbackOptionToPath(objectionOption, objectiveCallback);
    return this;
  }

  /**
   * Adds a particle option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<ParticleOption>} particleCallback The function to handle the particle option
   */
  addParticleOption(label, particleCallback) {
    const particleOption = new ParticleOption(label);
    this._addCallbackOptionToPath(particleOption, particleCallback);
    return this;
  }

  /**
   * Adds a scoreboard display option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<ScoreboardDisplayOption>} scoreboardDisplayCallback The function to handle the scoreboard display option
   */
  addScoreboardDisplayOption(label, scoreboardDisplayCallback) {
    const scoreboardDisplayOption = new ScoreboardDisplayOption(label);
    this._addCallbackOptionToPath(scoreboardDisplayOption, scoreboardDisplayCallback);
    return this;
  }

  /**
   * Adds a slot option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<SlotOption>} slotCallback The function to handle the slot option
   */
  addSlotOption(label, slotCallback) {
    const slotOption = new SlotOption(label);
    this._addCallbackOptionToPath(slotOption, slotCallback);
    return this;
  }

  /**
   * Adds a structure option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<StructureOption>} structureCallback The function to handle the structure option
   */
  addStructureOption(label, structureCallback) {
    const structureOption = new StructureOption(label);
    this._addCallbackOptionToPath(structureOption, structureCallback);
    return this;
  }

  /**
   * Adds a boolean option to this section's path.
   * 
   * @param {String} label The label of the option
   * @param {optionCallback<BooleanOption>} booleanCallback The function to handle the boolean option
   */
  addBooleanOption(label, booleanCallback) {
    const booleanOption = new BooleanOption(label);
    this._addCallbackOptionToPath(booleanOption, booleanCallback);
    return this;
  }

  /**
   * Adds a coordinate option(s) to this section's path.
   * 
   * @param {String} label The label of the option(s)
   * @param {Number} amount The number of 'coordinates' to add
   * @param {optionCallback<CoordinateOption>} coordinateCallback The function to handle the coordinate option(s)
   */
  addCoordinateOption(label, amount, coordinateCallback) {
    for (const i of range(amount)) {
      const coordinateOption = new CoordinateOption(label, amount - i);
      this._addCallbackOptionToPath(coordinateOption, coordinateCallback);
    }
    return this;
  }

  /**
   * Adds a section to the path.
   * 
   * @param {String|optionCallbackSection} section The saved section or a function that accepts a section
   * @throws {ReferenceError} Thrown if the section added does not exist.
   * @throws {TypeError} Thrown if the input is neither a string, nor a function.
   */
  addSectionOption(section) {
    if (typeof section === "string") {
      if (hasProperty(this.namedSections, section)) {
        this.addToPath(this.namedSections[section]);
      } else {
        throw new ReferenceError(`Section '${section}' does not exist.`);
      }
    } else if (typeof section === "function") {
      const newSection = new Section();
      this._addSectionCallbackOptionToPath(newSection, section);
    } else {
      throw new TypeError(`Provided input '${section}' is not a string or a function.`);
    }
    return this;
  }

  /**
   * Adds an section to this section's path and set a callback.
   * 
   * @param {Section} section The section to add to the path
   * @param {optionCallbackSection} callback The callback to run on the option
   */
  _addSectionCallbackOptionToPath(section, callback) {
    this._addCallbackOptionToPath(section, (sect) => {
      section._setTokens(this._tokens);
      section._setNamedSections(this.namedSections);
      if (typeof callback === "function") {
        callback(sect);
      }
    });
  }

  /**
   * Adds an option to this section's path and set a callback.
   * 
   * @param {BaseOption} option The option to add to the path
   * @param {optionCallback} callback The callback to run on the option
   */
  _addCallbackOptionToPath(option, callback) {
    option.setCallback(callback);
    this.addToPath(option);
  }

  /**
   * Adds an option to this section's path.
   * 
   * @param {BaseOption} option The option to add to the path
   */
  addToPath(option) {
    // The reason for this is to prevent infinite loops with recursive paths
    this.path.push((parent) => {
      option.executeCallback(parent);
      return option;
    });
  }

  /**
   * @param {Section|null} parent 
   */
  executeCallback(parent) {
    // prevent duplicate paths
    this.path = [];
    this._sectionChildren = [];
    super.executeCallback(parent);
  }

  /**
   * Sets the tokens.
   * 
   * @param {String[]} tokens The tokens
   */
  _setTokens(tokens) {
    this._tokens = tokens;
    for (const section of this._sectionChildren) {
      section._setTokens(tokens);
    }
  }

  /**
   * Sets the currently processed token.
   * 
   * @param {String} token The token being processed
   */
  _setPreviousToken(token) {
    this._previousToken = token;
    for (const section of this._sectionChildren) {
      section._setPreviousToken(token);
    }
  }

  /**
   * Gets the tokens.
   */
  getTokens() {
    return this._tokens;
  }

  /**
   * Gets the current token.
   */
  getPreviousToken() {
    return this._previousToken;
  }

  /**
   * (Internal use) Sets the named sections.
   * 
   * @param {Object.<string, Section>} namedSections The sections to set
   */
  _setNamedSections(namedSections) {
    this.namedSections = namedSections;
  }

  /**
   * Creates a named section, which can be used later.
   * @see {Section#addSectionOption}
   * 
   * @param {String} sectionName The name of the section to be added.
   * @param {optionCallbackSection} sectionCallback A function to handle the new section.
   * @throws {Error} Throw when the section already exists.
   */
  createNamedSection(sectionName, sectionCallback) {
    if (hasProperty(this.namedSections, sectionName)) {
      throw new Error(`A section by the name '${sectionName}' already exists.`);
    } else {
      const section = new Section();
      section.setCallback((sect) => {
        section._setTokens(this._tokens);
        section._setNamedSections(this.namedSections);
        if (typeof sectionCallback === "function") {
          sectionCallback(sect);
        }
      });
      this.namedSections[sectionName] = section;
    }
    return this;
  }

  /**
   * Finishes the creation phase of the section and returns a generator function that outputs outputs.
   * 
   * @generator
   * @yields {BaseOption[]}
   * @returns {Generator<BaseOption[], BaseOption[], BaseOption[]>}
   */
  *build() {
    let output = [];
    for (const i of range(this.path.length)) {
      const option = this.path[i](this);
      // Check option for specific cases
      // In the case of a sub command, additional sub commands or options may be present
      if (option.isParallel()) {
        // TODO: handle a section as a parallel option...
        output.push(option);
        // last option, return anyways
        if (i === this.path.length - 1) {
          yield output;
          // There may have been sub commands in this, check for them
          for (const option of output) {
            const SubCommandSection = require("./SubCommandSection");
            if (option instanceof SubCommandSection) {
              if (option.tokenIsApplicable(this.getPreviousToken())) {
                const build = option.build();
                build.next(); // get next option
                yield* build;
                // After entering a sub command, there is nothing else after it
                return;
              }
            }
          }
        }
      // If the option is a section, keep outputting all the section's options
      } else if (option instanceof Section) {
        this._sectionChildren.push(option);
        const sectionGenerator = option.build();
        // TODO: handle stuff if there is something in output still
        yield* sectionGenerator;
      } else {
        output.push(option);
        yield output;
        // Check output for sub commands
        for (const option of output) {
          const SubCommandSection = require("./SubCommandSection");
          if (option instanceof SubCommandSection) {
            if (option.tokenIsApplicable(this.getPreviousToken())) {
              const build = option.build();
              build.next(); // get next option
              yield* build;
              // After entering a sub command, there is nothing else after it
              return;
            }
          }
        }
        // Done collecting output, clear the output list
        output = [];
      }
    }
  }

}

module.exports = Section;