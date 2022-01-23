import '@babel/core'
import express from 'express'
import jwt from 'jsonwebtoken'
import http from 'http'
import app from '../config/express'
import { router as routerIndex } from '../routers/index'
const router = express.Router()

app.get('/', (req, res, next) => {
    return res.status(200).send({ message: `Welcome to ${process.env.APP_NAME}` });
})

router.use('/v1', routerIndex)
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
});