import { usersController } from '../controller/usersController'
import express from 'express'
import Auth from '../common/middleware/jwt'
const router = express.Router()

router.route('/getName').get(Auth.verifyToken, usersController.getAllUsers)


export { router }