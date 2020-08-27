'use strict';

const Joi = require(`joi`);

const schema = Joi.object({
  picture: Joi.when(Joi.ref(`originalName`), {
    is: Joi.valid(``),
    then: Joi.valid(``),
    otherwise: Joi.object({
      name: Joi.when(`originalName`, {
        is: Joi.valid(``),
        then: Joi.valid(``),
        otherwise: Joi.string()
      }),
      originalName: Joi.string().allow(``)
    })
  })
});

(async () => {
  const q = await schema.validateAsync({
    picture: {
      name: ``,
      originalName: ``
    }
  });
  console.log(q);
})();
