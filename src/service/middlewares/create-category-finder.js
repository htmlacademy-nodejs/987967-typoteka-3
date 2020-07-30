'use strict';

const appLogger = require(`../../logger`).getLogger(`app`);

const createCategoryFinder = (service) => async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    const category = await service.getCategory(categoryId);

    if (!category) {
      const message = `Can't find category with ID='${categoryId}'`;
      appLogger.error(message);
      throw new Error(message);
    }

    res.locals.category = category;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategoryFinder
};
