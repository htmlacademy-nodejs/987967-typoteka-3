'use strict';

const {DataTypes, Model, Sequelize} = require(`sequelize`);

module.exports = (sequelize) => {
  class Post extends Model {
    static associate({User, Picture, Comment, PostCategory, Category}) {
      Post.belongsTo(Picture, {
        foreignKey: `picture_id`,
      });

      Post.belongsTo(User, {
        foreignKey: `user_id`,
      });

      Post.hasMany(Comment, {
        foreignKey: `post_id`,
      });

      Post.belongsToMany(Category, {
        through: PostCategory,
        foreignKey: `post_id`,
        as: `Category`
      });
    }
  }

  Post.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    [`user_id`]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `Users`,
        key: `id`,
      },
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    },

    [`picture_id`]: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: `Pictures`,
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
    modelName: `Post`
  });

  return Post;
};
