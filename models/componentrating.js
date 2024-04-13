'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComponentRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ComponentRating.belongsTo(models.UserReview, { foreignKey: 'review_id', as: 'Userreview' });
    }
  }
  ComponentRating.init({
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ComponentRating',
  });
  return ComponentRating;
};