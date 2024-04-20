'use strict';
const {
  Model
} = require('sequelize');
const UserReview = require('./userreview');
const ComponentRating = require('./componentrating');
module.exports = (sequelize, DataTypes) => {
  class ReviewComponent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewComponent.hasMany(models.ComponentRating, { foreignKey: 'component_id', as: 'componentrating' });
    }
  }
  ReviewComponent.init({
    component_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewComponent',
  });
  return ReviewComponent;
};