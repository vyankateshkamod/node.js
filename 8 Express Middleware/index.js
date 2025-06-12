// https://expressjs.com/en/guide/using-middleware.html

const express = require("express") ;
const fs = require("fs")
const app = express() ;

const PORT = 8000 ;

// Middlewares

app.use((req , res , next)=>{
    console.log("hello from middleware 1") ;
    // return res.json({msg : "Hello from middleware"}) ; use this if you want to directly send response from the middleware
    req.myUsername = "Soham Shaikh" ;
    next() ;
})

app.use((req , res , next)=>{
    console.log("Hello from middleware 2") ;
    next() ; 
})

// real use case 
app.use((req , res , next)=>{  
    fs.appendFile("log.txt" , `\n ${Date.now()} : ${req.method} : ${req.path}` , (err , data)=>{
        next() ;
    }) ;
})

app.get("/users",(req , res)=>{
    res.end("Hello from get function " + req.myUsername) ;
})

app.listen(PORT , ()=>{
    console.log(`Server Started on PORT ${PORT}`) ;
})