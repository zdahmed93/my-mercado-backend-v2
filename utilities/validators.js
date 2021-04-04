const Joi = require('joi');

const itemValidator = Joi.object({
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    photo: Joi.string(),
    price: Joi.number().required()
});

module.exports = {
    itemValidator
}