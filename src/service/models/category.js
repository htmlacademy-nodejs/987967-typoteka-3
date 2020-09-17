'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {CategoryLength} = require(`../const`);

class Category extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes[`STRING`](CategoryLength.MAX),
        allowNull: false,
        unique: true,
      },

    }, {
      sequelize,
      tableName: `categories`,
    });
  }

  static associate({Post, PostCategory}) {
    Category.belongsToMany(Post, {
      through: PostCategory,
      foreignKey: `category_id`,
    });

    this.PostCategory = this.hasMany(PostCategory, {
      foreignKey: `category_id`,
      as: `posts`
    });
  }
}

module.exports.Category = Category;
