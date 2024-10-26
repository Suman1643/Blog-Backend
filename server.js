import app from './app.js';

app.listen( process.env.PORT, ()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})

// export default server;