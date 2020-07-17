'use strict';

const {DataTypes, Model, Sequelize} = require(`sequelize`);

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate({User, Post}) {
      Comment.belongsTo(User, {
        foreignKey: `user_id`,
      });

      Comment.belongsTo(Post, {
        foreignKey: `post_id`,
      });
    }
  }

  Comment.init({
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
        model: `Users`,
        key: `id`,
      },
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    },

    [`post_id`]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `Posts`,
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
    modelName: `Comment`,
  });

  return Comment;
};
