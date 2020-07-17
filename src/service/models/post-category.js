'use strict';

const {DataTypes, Model} = require(`sequelize`);
module.exports = (sequelize) => {
  class PostCategory extends Model {}

  PostCategory.init({
    [`post_id`]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: `Posts`,
        key: `id`,
      },
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    },

    [`category_id`]: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: `Categories`,
        key: `id`,
      },
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    },

  }, {
    sequelize,
    freezeTableName: false,
    tableName: `Posts_Categories`
  });

  return PostCategory;
};
