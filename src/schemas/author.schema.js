import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(100)
        .required(),
})

export default (data) => schema.validate(data)