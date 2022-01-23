import { UsersEnum } from '../common/enum'
import { baseResponse } from '../common/helpers/baseResponse'
import { models } from '../models'
import * as PasswordService from '../services/password-service'

class usersController {
    static async login(req, res, next) {
        const { email, password } = req.body
        const where = { email: email.toLowerCase() }
        const existing = await models.Users.findOne({ where })
        if (!existing) return baseResponse({ success: false, message: "user not found" })(res, 400)

        const passwordMatch = await PasswordService.compare(existing.password, password)
        if (!passwordMatch) return baseResponse({ success: false, message: "Password Incorrect !" })(res, 400)


        return baseResponse({ data: existing })(res, 200)
    }

    static async getAllUsers(req, res, next) {
        const data = [
            { name: 'Teguh' },
            { name: 'Setiawan' }
        ]

        return baseResponse({ success: true, message: "", data })(res, 200)
    }
}

export { usersController }