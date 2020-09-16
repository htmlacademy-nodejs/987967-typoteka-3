'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {FileNameLength} = require(`../const`);

class Avatar extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      [`user_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: `users`,
          key: `id`,
        }
      },

      name: {
        type: DataTypes[`STRING`](FileNameLength.MAX),
        allowNull: false,
        unique: true,
      },

      originalName: {
        type: DataTypes[`STRING`](FileNameLength.MAX),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: `avatars`,
    });
  }
}

module.exports.Avatar = Avatar;
