'use strict';

const {HttpStatusCode} = require(`../const`);
const {commentSchema} = require(`../joi-schemas`);

const getException = (messages) => ({
  details: messages.map((it) => ({message: it}))
});

const createCommentValidator = (service) => async (req, res, next) => {
  try {
    await commentSchema.validateAsync(req.body, {abortEarly: false});

    const userId = req.body.userId;
    const user = await service.getUser(userId);

    if (!user) {
      throw getException([`User "${userId}" is not exists`]);
    }

    next();
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      messages: err.details.map((it) => it.message)
    });
  }
};

module.exports = {
  createCommentValidator,
};
