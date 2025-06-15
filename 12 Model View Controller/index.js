const express = require('express');
const {connectMongoDb} = require("./connection") ;
const {logReqRes} = require("./middlewares/index") ;
const userRouter = require("./routes/user") ;
const app = express();
const PORT = 8000 ;

// connection
connectMongoDb('mongodb://127.0.0.1:27017/soham').then(()=> console.log('MongoDB Connected !')) ;     // local host

// Middleware - plugin
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes('log.txt')) ;

// Routes
app.use('/users' , userRouter) ;

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT} !`);
})