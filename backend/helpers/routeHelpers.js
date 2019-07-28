import { Joi } from 'celebrate';

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .required()
        .min(6),
    }),
  },
};
