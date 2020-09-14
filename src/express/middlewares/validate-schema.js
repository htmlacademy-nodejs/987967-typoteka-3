'use strict';

const {parseJoiException, splitJoiException} = require(`../utils`);
const logger = require(`../../logger`).getLogger(`app`);

const validateSchema = (schema, data, template, templateData = {}) => async (req, res, next) => {
  try {
    await schema.validateAsync(data, {abortEarly: false});
    next();
  } catch (err) {
    logger.info(`Validate error ${err}`);
    const allErrors = parseJoiException(err);
    const errors = splitJoiException(err);
    res.render(template, {
      formData: data,
      ...templateData,
      errors,
      allErrors,
      user: req.session.user,
    });
  }
};

const validateQuerySchema = (schema, template, templateData) => async (req, res, next) => {
  validateSchema(schema, req.query, template, templateData)(req, res, next);
};

const validateBodySchema = (schema, template, templateData) => async (req, res, next) => {
  const data = req.file ? {
    ...req.body,
    fileName: req.file.filename,
    originalName: req.file.originalname,
  } : {...req.body};

  validateSchema(schema, data, template, templateData)(req, res, next);
};

const validateParamSchema = (schema, template, templateData) => async (req, res, next) => {
  validateSchema(schema, req.param, template, templateData)(req, res, next);
};

module.exports = {
  validateSchema,
  validateQuerySchema,
  validateParamSchema,
  validateBodySchema,
};
