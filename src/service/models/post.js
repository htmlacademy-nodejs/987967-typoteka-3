'use strict';

const {DataTypes, Model, Sequelize} = require(`sequelize`);

class Post extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      [`picture_id`]: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: `pictures`,
          key: `id`,
        },
        onDelete: `SET NULL`,
        onUpdate: `CASCADE`
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      title: {
        type: DataTypes[`STRING`](250),
        allowNull: false,
      },

      announce: {
        type: DataTypes[`STRING`](250),
        allowNull: false,
      },

      text: {
        type: DataTypes[`STRING`](1000),
        allowNull: true,
      },

    }, {
      sequelize,
      tableName: `posts`,
    });
  }

  static associate({Picture, Comment, PostCategory, Category}) {
    Post.belongsTo(Picture, {
      foreignKey: `picture_id`,
    });

    Post.hasMany(Comment, {
      foreignKey: `post_id`,
    });

    Post.belongsToMany(Category, {
      through: PostCategory,
      foreignKey: `post_id`,
    });

    Post.hasMany(PostCategory, {
      foreignKey: `post_id`,
    });
  }
}

module.exports.Post = Post;
