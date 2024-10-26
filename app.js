import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './src/db/dbConnection.js';
import errorMiddleware from './src/middlewares/error.js';
import userRouter from './src/routes/userRouter.js';
// import blogRouter from './src/routes/blogRouter.js';


const app = express();
dotenv.config({path: './config/config.env'});

app.use(
    cors({
        origin: [],
        methods: ['GET', 'PUT', 'DELETE', 'POST'],
        credentials: true
    }
));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello from the server!");
})
app.use("/api/v1", userRouter);

dbConnection();

app.use(errorMiddleware);

export default app;