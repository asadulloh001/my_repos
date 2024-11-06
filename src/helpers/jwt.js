import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export function getTokens(user) {
    const payload = {
        name: user.name,
        email: user.email,
        role: user.role
    }
    return jwt.sign(
        payload, 
        process.env.SECRET_KEY, 
        {expiresIn: process.env.EXPIRE_ACCESS_IN}
    )
}

export function verifyTokens(token) {
    const res = jwt.verify(token, process.env.SECRET_KEY)
    return res
}