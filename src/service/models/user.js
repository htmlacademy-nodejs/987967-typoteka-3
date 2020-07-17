'use strict';

const {DataTypes, Model} = require(`sequelize`);

module.exports = (sequelize) => {
  class User extends Model {
    static associate({Avatar, Post, Comment, Password}) {
      User.hasOne(Password, {
        foreignKey: `user_id`,
      });

      User.belongsTo(Avatar, {
        foreignKey: `avatar_id`,
      });

      User.hasMany(Post, {
        foreignKey: `user_id`,
      });

      User.hasMany(Comment, {
        foreignKey: `user_id`,
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes[`STRING`](250),
      allowNull: false,
      unique: true,
      isEmail: true,
    },

    [`avatar_id`]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `Avatars`,
        key: `id`,
      },
      onDelete: `SET NULL`,
      onUpdate: `CASCADE`
    },

    firstname: {
      type: DataTypes[`STRING`](250),
      allowNull: false,
    },

    lastname: {
      type: DataTypes[`STRING`](250),
      allowNull: false,
    },

  }, {
    sequelize
  });

  return User;
};
