'use strict';

const {DataTypes, Model} = require(`sequelize`);

module.exports = (sequelize) => {
  class Category extends Model {
    static associate({Post, PostCategory}) {
      Category.belongsToMany(Post, {
        through: PostCategory,
        foreignKey: `category_id`,
        as: `Post`
      });
    }
  }

  Category.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes[`STRING`](60),
      allowNull: false,
      unique: true,
    },

  }, {
    sequelize,
    freezeTableName: false,
    tableName: `Categories`,
  });

  return Category;
};
