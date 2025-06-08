const express = require("express") ;

const app = express() ;

app.get("/" , (req,res)=>{
    return res.send("Home") ;
})

app.get("/about" , (req,res)=>{
    return res.send("About Page "+"Hey " +req.query.name + " you are " + req.query.age) ;
})

app.listen(8000,()=> console.log("Server Started !")) ;