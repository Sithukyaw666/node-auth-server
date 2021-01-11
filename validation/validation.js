const joi = require("joi");

const registerValidation = (object) => {
  const schema = joi.object({
    name: joi.string().min(6).max(255).required(),
    email: joi
      .string()
      .email({
        tlds: { allow: ["com"] },
      })
      .required(),
    password: joi.string().required().min(8).max(255),
  });
  return schema.validate(object);
};

const loginValidation = (object) => {
  const schema = joi.object({
    email: joi
      .string()
      .email({
        tlds: { allow: ["com"] },
      })
      .required(),
    password: joi.string().required().min(8).max(255),
  });
  return schema.validate(object);
};
module.exports = {
  registerValidation,
  loginValidation,
};
