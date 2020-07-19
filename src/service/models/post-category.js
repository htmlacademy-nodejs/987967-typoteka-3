'use strict';

const {DataTypes, Model} = require(`sequelize`);

class PostCategory extends Model {
  static init(sequelize) {
    return super.init({
      [`post_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: `posts`,
          key: `id`,
        },
        onDelete: `CASCADE`,
        onUpdate: `CASCADE`
      },

      [`category_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: `categories`,
          key: `id`,
        },
        onDelete: `CASCADE`,
        onUpdate: `CASCADE`
      },

    }, {
      sequelize,
      tableName: `posts_categories`,
    });
  }

  static associate({Post, Category}) {
    PostCategory.belongsTo(Post, {
      foreignKey: `post_id`
    });

    PostCategory.belongsTo(Category, {
      foreignKey: `category_id`,
    });
  }
}

module.exports.PostCategory = PostCategory;
