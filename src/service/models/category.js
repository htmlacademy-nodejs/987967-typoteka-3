'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {
  static init(sequelize) {
    return super.init({
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
      tableName: `categories`,
    });
  }

  static associate({Post, PostCategory}) {
    Category.belongsToMany(Post, {
      through: PostCategory,
      foreignKey: `category_id`,
    });

    // Category.hasMany(PostCategory, {
    //   foreignKey: `category_id`
    // });
  }
}

module.exports.Category = Category;
