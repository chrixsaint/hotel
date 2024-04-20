'use strict';
const {
  Model
} = require('sequelize');
const Country = require('./country');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Region.hasMany(models.Country, { foreignKey: 'region_id', as: 'country' });
    }
  }
  Region.init({
    region_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};