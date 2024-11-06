import { verifyTokens } from "../helpers/jwt.js"


export function superCheck (req, res, next) {
    try {
        const allowedRoles = ['superadmin']
        var token = req.headers.authorization
        if(!token) {
            return res.status(409).json({success: false, error: "Please provide your token"})
        }
        var token = token.split(' ')[1]

        const verification = verifyTokens(token)
        if(!allowedRoles.includes(verification.role)) 
            return res.status(409).json({success: false, message: "You are not a superadmin!"})
        res.user = verification
        next()
    } catch (error) {
        res.status(500).send({success: false, error: error.message})
    }
}

export function adminCheck (req, res, next) {
    try {
        const allowedRoles = ['admin', 'superadmin']
        var token = req.headers.authorization
        if(!token) {
            return res.status(409).json({success: false, error: "Please provide your token"})
        }
        var token = token.split(' ')[1]

        const verification = verifyTokens(token)
        if(!allowedRoles.includes(verification.role)) 
            return res.status(409).json({success: false, message: "You are not an admin!"})
        res.user = verification
        next()
    } catch (error) {
        res.status(500).send({success: false, error: error.message})
    }
}

export function userCheck (req, res, next) {
    try {
        const allowedRoles = ['user', 'admin', 'superadmin']
        var token = req.headers.authorization
        if(!token) {
            return res.status(409).json({success: false, error: "Please provide your token"})
        }
        var token = token.split(' ')[1]

        const verification = verifyTokens(token)
        if(!allowedRoles.includes(verification.role))
            return res.status(409).json({success: false, message: "You are not a member!"})
        res.user = verification
        next()
    } catch (error) {
        res.status(500).send({success: false, error: error.message})
    }
}