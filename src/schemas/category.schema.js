import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    description: Joi.string().required()
})

export default (data) => schema.validate(data)