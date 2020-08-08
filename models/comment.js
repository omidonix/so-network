'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      comment.belongsTo(models.users,{
        foreignKey: 'user_id',
        as: 'users'
       })
       
    }
  };
  comment.init({
    content: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'comment',
  });
  return comment;
};