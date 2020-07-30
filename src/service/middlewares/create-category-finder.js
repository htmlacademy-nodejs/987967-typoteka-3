'use strict';

const {HttpStatusCode} = require(`../const`);
const appLogger = require(`../../logger`).getLogger(`app`);

const createCategoryFinder = (service) => async (req, res, next) => {
  const {categoryId} = req.params;
  let category;
  let message;

  try {
    category = await service.getCategory(categoryId);
  } catch (err) {
    message = `Bad database request`;
    appLogger.error(`${message}: ${err}`);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  if (!category) {
    message = `Can't find category with ID='${categoryId}'`;
    appLogger.error(message);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  res.locals.category = category;
  next();
};

module.exports = {
  createCategoryFinder
};
