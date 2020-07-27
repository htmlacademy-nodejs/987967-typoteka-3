'use strict';

const {HttpStatusCode} = require(`../const`);
const {logger, LogMessage} = require(`../../logger`);

const createCategoryFinder = (service) => async (req, res, next) => {
  const {categoryId} = req.params;

  const category = await service.getCategory(categoryId);
  if (!category) {
    const message = LogMessage.getWrongObjectID(`Category`, categoryId);
    logger.error(message);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  res.locals.category = category;
  logger.debug(LogMessage.printObject(`Category`, category));
  next();
};

module.exports = {
  createCategoryFinder
};
