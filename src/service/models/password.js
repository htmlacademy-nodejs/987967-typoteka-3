'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Password extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      password: {
        type: DataTypes[`STRING`](50),
        allowNull: false,
      },

      [`user_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: `users`,
          key: `id`,
        },
        onDelete: `RESTRICT`,
        onUpdate: `CASCADE`,
      }
    }, {
      sequelize,
      tableName: `passwords`,
    });
  }

  static associate({User}) {
    Password.belongsTo(User, {
      foreignKey: `user_id`,
    });
  }
}

module.exports.Password = Password;
