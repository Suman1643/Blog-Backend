import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './src/db/dbConnection.js';
import userRouter from './src/routes/userRouter.js';
import blogRouter from './src/routes/blogRouter.js';
import errorMiddleware from './src/middlewares/newerror.js';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
// import blogRouter from './src/routes/blogRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'https://blog-frontend-xi-beige.vercel.app',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

app.options('*', cors({
    origin: 'https://blog-frontend-xi-beige.vercel.app',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
dbConnection();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'  // Location for storing the uploaded files.
 
}));
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

app.use(errorMiddleware);

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME ,
    api_key: process.env.CLOUDINARY_CLIENT_API ,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET 
})

app.listen( process.env.PORT, ()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})
