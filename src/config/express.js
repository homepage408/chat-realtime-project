import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "3mb" }));

// if(process.env.ALLOW_ORIGIN){
//     app.use(cors({origin: process.env.ALLOW_ORIGIN.split(';')}));
// } else {
//     app.use(cors());
// }
app.use(cors());

app.disable('x-powered-by');
app.use((_, res, next) => {
    res.setHeader("Content-Security-Policy", "style-src 'unsafe-inline'; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com");
    next();
})

export default app;