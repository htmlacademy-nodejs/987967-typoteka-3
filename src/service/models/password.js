'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {PasswordHashLength} = require(`../const`);

class Password extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      password: {
        type: DataTypes[`STRING`](PasswordHashLength.MAX),
        allowNull: false,
      },

      [`user_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: `users`,
          key: `id`,
        },
        onDelete: `CASCADE`,
        onUpdate: `CASCADE`,
      }
    }, {
      sequelize,
      tableName: `passwords`,
    });
  }
}

module.exports.Password = Password;
