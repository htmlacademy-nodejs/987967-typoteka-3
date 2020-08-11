'use strict';

const {Picture} = require(`../models`);

const updatePicture = async (postId, pictureData, transaction) => {
  const createPicture = async () => Picture.create({
    [`post_id`]: postId,
    name: pictureData.name,
    originalName: pictureData.originalName,
  }, {transaction});

  const destroyPicture = async () => Picture.destroy({where: {[`post_id`]: postId}}, {transaction});

  const oldPicture = !!(await Picture.findOne({where: {[`post_id`]: postId}}));
  const newPicture = !!pictureData;

  switch (true) {
    case oldPicture && newPicture:
      if (oldPicture.name === pictureData.name) {
        return Promise.resolve();
      }

      await destroyPicture();
      return createPicture();

    case !oldPicture && newPicture:
      return createPicture();

    case oldPicture && !newPicture:
      return destroyPicture();

    case !oldPicture && !newPicture:
    default:
      return Promise.resolve();
  }
};

module.exports = {
  updatePicture,
};
