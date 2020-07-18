'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {
  static init(sequelize) {
    return super.init({
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

      firstname: {
        type: DataTypes[`STRING`](250),
        allowNull: false,
      },

      lastname: {
        type: DataTypes[`STRING`](250),
        allowNull: false,
      },

    }, {
      sequelize,
      tableName: `users`,
    });
  }

  static associate({Avatar, Comment, Password}) {
    User.hasOne(Password, {
      foreignKey: `user_id`,
    });

    User.hasOne(Avatar, {
      foreignKey: `user_id`,
    });

    User.hasMany(Comment, {
      foreignKey: `user_id`,
    });
  }
}

module.exports.User = User;
