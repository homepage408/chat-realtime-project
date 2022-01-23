import jwt from 'jsonwebtoken'
import { baseResponse } from '../helpers/baseResponse'

const generateToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRED })
    return token
}


const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization
    // bearer token
    token = token.split(' ')[1]
    if (!token) return baseResponse({ success: false, message: "Your session expired, please Sign in again." })(res, 400)

    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    delete payload.iat
    delete payload.exp

    req.user = { ...payload }
    next()
}

export default { generateToken, verifyToken }