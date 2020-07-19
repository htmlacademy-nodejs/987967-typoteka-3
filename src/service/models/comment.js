'use strict';

const {DataTypes, Model, Sequelize} = require(`sequelize`);

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      [`user_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: `users`,
          key: `id`,
        },
        onDelete: `CASCADE`,
        onUpdate: `CASCADE`
      },

      [`post_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: `posts`,
          key: `id`,
        },
        onDelete: `CASCADE`,
        onUpdate: `CASCADE`
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      text: {
        type: DataTypes[`STRING`](250),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: `comments`,
    });
  }
}

module.exports.Comment = Comment;
