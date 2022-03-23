/**
 * Checks whether the object has a property.
 * 
 * @param {Object} object The object to check for properties on
 * @param {String|Number} property The property to check for
 * @return {Boolean} Whether the object has the property or not
 */
function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

module.exports = hasProperty;