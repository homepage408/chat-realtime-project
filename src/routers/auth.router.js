import { authController } from '../controller/authController'
import express from 'express'
const router = express.Router()

router.route('/signUpUser').post(authController.signUpUsers)
router.route('/login').post(authController.login)

export { router }