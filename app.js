import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './src/db/dbConnection.js';
import userRouter from './src/routes/userRouter.js';
import errorMiddleware from './src/middlewares/newerror.js';
// import blogRouter from './src/routes/blogRouter.js';


const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.get("/", (req, res) => {
    res.send("Hello from the server!");
})
app.use("/api/v1", userRouter);

app.use(errorMiddleware);

app.listen( process.env.PORT, ()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})