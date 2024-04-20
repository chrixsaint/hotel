'use strict';
const {
  Model
} = require('sequelize');
const Property = require('./property');
module.exports = (sequelize, DataTypes) => {
  class PlaceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaceType.hasMany(models.Property, { foreignKey: 'place_type_id', as: 'properties' });
    }
  }
  PlaceType.init({
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlaceType',
  });
  return PlaceType;
};