'use strict';

const {DataTypes, Model} = require(`sequelize`);

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
        type: DataTypes[`STRING`](250),
        allowNull: false,
        unique: true,
      },

      originalName: {
        type: DataTypes[`STRING`](100),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: `avatars`,
    });
  }

  static associate({User}) {
    Avatar.belongsTo(User, {
      foreignKey: `user_id`,
    });
  }
}

module.exports.Avatar = Avatar;
