'use strict';
const {
  Model
} = require('sequelize');

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      like.belongsTo(models.post, { foreignKey: 'likeableId', constraints: false });
    }

    getLikeable(options) {
      if (!this.likeableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.likeableType)}`;
      return this[mixinMethodName](options);
    }

  };
  like.init({
    user_id: DataTypes.INTEGER,
    likeableId: DataTypes.INTEGER,
    likeableType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'like',
  });



  like.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.likeableType === "post" && instance.post !== undefined) {
        instance.like = instance.post;
      }
      // To prevent mistakes:
      delete instance.post;
      delete instance.dataValues.post;
    }
  });


  return like;
};