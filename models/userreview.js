'use strict';
const {
  Model
} = require('sequelize');
const property = require('./property');
const User = require('./user');
const ReviewComponent = require('./reviewcomponent');
const ComponentRating = require('./componentrating');
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserReview.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property' });
      UserReview.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      UserReview.hasMany(models.ComponentRating, { foreignKey: 'review_id', as: 'componentrating' });
    }
  }
  UserReview.init({
    overall_rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    review_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserReview',
  });
  return UserReview;
};