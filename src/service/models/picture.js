'use strict';

const {DataTypes, Model} = require(`sequelize`);

module.exports = (sequelize) => {
  class Picture extends Model {
    static associate({Post}) {
      Picture.hasOne(Post, {
        foreignKey: `picture_id`,
      });
    }
  }

  Picture.init({
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

  return Picture;
};
