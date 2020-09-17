'use strict';

const {DataTypes, Model, Sequelize} = require(`sequelize`);
const {TitleLength, TextLength, AnnounceLength} = require(`../const`);

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
        type: DataTypes[`STRING`](TitleLength.MAX),
        allowNull: false,
      },

      announce: {
        type: DataTypes[`STRING`](AnnounceLength.MAX),
        allowNull: false,
      },

      text: {
        type: DataTypes[`STRING`](TextLength.MAX),
        allowNull: true,
      },

    }, {
      sequelize,
      tableName: `posts`,
    });
  }

  static associate({Picture, Comment, PostCategory, Category}) {
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
      as: `postCategories`
    });

    this.Category = this.belongsToMany(Category, {
      through: PostCategory,
      foreignKey: `post_id`,
      as: `categories`
    });
  }
}

module.exports.Post = Post;
