'use strict';
const {
  Model
} = require('sequelize');
const Location = require('./location');
const Region = require('./region');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Location, { foreignKey: 'country_id', as: 'location' });
      Country.belongsTo(models.Region, { foreignKey: 'region_id', as: 'region' });
    }
  }
  Country.init({
    country_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};