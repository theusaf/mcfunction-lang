const BaseOption = require("../BaseOption"),
  ATTRIBUTES = [
    "generic.max_health",
    "generic.follow_range",
    "generic.knockback_resistance",
    "generic.movement_speed",
    "generic.attack_damage",
    "generic.armor",
    "generic.armor_toughness",
    "generic.attack_knockback",
    "generic.attack_speed",
    "generic.luck",
    "horse.jump_strength",
    "generic.flying_speed",
    "zombie.spawn_reinforcements"
  ];

/**
 * Represents an attribute option.
 */
class AttributeOption extends BaseOption {

  reformatOutput(lastToken) {
    const result = [];
    for (const attribute of ATTRIBUTES) {
      if (attribute.startsWith(lastToken) || lastToken === "") {
        const output = super.reformatOutput();
        Object.assign(output, {
          text: attribute
        });
        result.push(output);
      }
    }
    return result;
  }

}

module.exports = AttributeOption;