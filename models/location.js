'use strict';
const {
  Model
} = require('sequelize');
const Property = require('./property');
const Country = require('./country');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.Property, { foreignKey: 'location_id', as: 'properties' });
      Location.belongsTo(models.Country, { foreignKey: 'country_id', as: 'country' });
    }
  }
  Location.init({
    location_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};