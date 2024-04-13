'use strict';
const {
  Model
} = require('sequelize');
const Property = require('./property'); 
module.exports = (sequelize, DataTypes) => {
  class PropertyType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyType.hasMany(models.Property, { foreignKey: 'property_type_id', as: 'properties' });
    }
  }
  PropertyType.init({
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PropertyType',
  });
  return PropertyType;
};