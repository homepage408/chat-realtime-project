import express from 'express';
const router = express.Router()
import { router as routerUsers } from './users.router'
import { router as routerAuth } from './auth.router'

router.use('/users', routerUsers)
router.use('/auth', routerAuth)

export { router }

