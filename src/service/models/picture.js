'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Picture extends Model {
  static init(sequelize) {
    return super.init({
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
      sequelize,
      tableName: `pictures`,
    });
  }

  static associate({Post}) {
    Picture.hasOne(Post, {
      foreignKey: `picture_id`,
    });
  }
}

module.exports.Picture = Picture;
