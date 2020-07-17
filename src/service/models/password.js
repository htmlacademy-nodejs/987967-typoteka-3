'use strict';

const {DataTypes, Model} = require(`sequelize`);

module.exports = (sequelize) => {
  class Password extends Model {
    static associate({User}) {
      Password.belongsTo(User, {
        foreignKey: `user_id`,
      });
    }
  }

  Password.init({
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
        model: `Users`,
        key: `id`,
      },
      onDelete: `RESTRICT`,
      onUpdate: `CASCADE`,
    }

  }, {
    sequelize,
  });

  return Password;
};
