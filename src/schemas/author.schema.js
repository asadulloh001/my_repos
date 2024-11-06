import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    birth_year: Joi.date(),
    description: Joi.string().required()
})

export default (data) => schema.validate(data)