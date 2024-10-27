import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './src/db/dbConnection.js';
import userRouter from './src/routes/userRouter.js';
import errorMiddleware from './src/middlewares/newerror.js';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
// import blogRouter from './src/routes/blogRouter.js';


const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    credentials: true,
  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'  // Location for storing the uploaded files.
 
}));

app.use("/api/v1", userRouter);

app.use(errorMiddleware);

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME ,
    api_key: process.env.CLOUDINARY_CLIENT_API ,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET 
})

app.listen( process.env.PORT, ()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})