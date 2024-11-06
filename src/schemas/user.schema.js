import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required()
        .label("Confirm password")
        .messages({'any.only': '{{#lable}} does not match'}),
    role: Joi.string().valid('admin', 'user').default('user')
})

export default (data) => schema.validate(data)