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

  static associate({Picture, Comment, PostCategory}) {
    this.Picture = this.hasOne(Picture, {
      foreignKey: `post_id`,
      as: `picture`
    });

    this.Comment = this.hasMany(Comment, {
      foreignKey: `post_id`,
      as: `comments`
    });

    this.PostCategory = this.hasMany(PostCategory, {
      foreignKey: `post_id`,
      as: `categories`
    });
  }
}

module.exports.Post = Post;
