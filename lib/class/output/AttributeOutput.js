const Output = require("../Output"),
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

class AttributeOutput extends Output {
  constructor(description, label) {
    super({
      description,
      rightLabel: label
    });
  }

  getOutput(lastToken) {
    const output = [],
      tokenValue = lastToken.getValue();
    for (const attribute of ATTRIBUTES) {
      if (attribute.toLowerCase().startsWith(tokenValue.toLowerCase())) {
        output.push({
          type: "attribute",
          text: attribute,
          displayText: attribute,
          description: this.description,
          rightLabel: this.rightLabel
        });
      }
    }
    return output;
  }
}

module.exports = AttributeOutput;
  