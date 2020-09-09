'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const Joi = require(`joi`);

const createSearchRouter = (service) => {
  const router = new Router();

  router.get(`/`, async (req, res, next) => {
    const schema = Joi.object({
      query: Joi.string().max(250).required()
    });

    try {
      await schema.validateAsync(req.query);

      const query = req.query.query;
      const foundPosts = await service.search(query);
      res.status(HttpStatusCode.OK).json(foundPosts);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  createSearchRouter
};
