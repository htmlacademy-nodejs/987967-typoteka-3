'use strict';

const Joi = require(`joi`);

const schema = Joi.object({
  postId: Joi.number().required(),
  commentId: Joi.valid(...[1, 2, 3]).required()
}).allow({});

(async () => {
  try {
    const q = await schema.validateAsync({
    });
    console.log(q);
  } catch (err) {
    console.error(err);
  }
})();


// console.info(value)
// console.info(error)
