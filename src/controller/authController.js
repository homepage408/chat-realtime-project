import { UsersEnum } from "../common/enum";
import { baseResponse } from '../common/helpers/baseResponse'
import { models } from "../models"
import * as PasswordService from '../services/password-service'
import Auth from '../common/middleware/jwt'

class authController {
    static async signUpUsers(req, res, next) {
        const { name, role, email, password } = req.body
        const existing = await models.Users.findOne({ where: { email: email.toLowerCase() } })
        if (existing) return baseResponse({ success: false, message: "this email is already used" })(res, 400)
        if (!Object.values(UsersEnum).includes(role)) return baseResponse({ success: false, message: "user enum does not match" })(res, 400)

        const createInput = {
            name, role, email: email.toLowerCase(), password: await PasswordService.toHash(password)
        }
        await models.Users.create(createInput)
        return baseResponse({ success: true, message: "successfully registered, please login to continue" })(res, 200)
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        const existing = await models.Users.findOne({ where: { email: email.toLowerCase() }, raw:true })
        if (!existing) return baseResponse({ success: false, message: `user not found by email ${email}` })(res, 404)

        const passwordMatch = await PasswordService.compare(existing.password, password)
        if (!passwordMatch) return baseResponse({ success: false, message: "Password Incorrect" })(res, 400)

        // token
        const token = await Auth.generateToken(existing)

        return baseResponse({ success: true, message: "success", data: existing, token: token })(res, 200)
    }
}

export { authController }