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

  static associate({Avatar, Password}) {
    this.Password = this.hasOne(Password, {
      foreignKey: `user_id`,
      as: `password`
    });

    this.Avatar = this.hasOne(Avatar, {
      foreignKey: `user_id`,
      as: `avatar`
    });
  }
}

module.exports.User = User;
