const Joi = require('joi');

const registrationValidation = (data) => {

    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),

        email: Joi.string()
            .required()
            .min(6),

        password: Joi.string()
            .required()
            .min(6)
    });
    return schema.validate(data);
};

const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string()
            .required()
            .min(6),

        password: Joi.string()
            .required()
            .min(6)
    });
    return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation