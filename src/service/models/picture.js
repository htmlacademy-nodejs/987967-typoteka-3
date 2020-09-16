'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {FileNameLength} = require(`../const`);

class Picture extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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

      [`post_id`]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: `posts`,
          key: `id`,
        },
        onDelete: `CASCADE`,
        onUpdate: `CASCADE`
      }
    }, {
      sequelize,
      tableName: `pictures`,
    });
  }
}

module.exports.Picture = Picture;
