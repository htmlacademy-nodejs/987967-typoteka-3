'use strict';

const {DataTypes, Model} = require(`sequelize`);

module.exports = (sequelize) => {

  class Avatar extends Model {
    static associate({User}) {
      Avatar.hasOne(User, {
        foreignKey: `avatar_id`,
      });
    }
  }

  Avatar.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
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
    sequelize
  });

  return Avatar;
};
