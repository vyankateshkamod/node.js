// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

const express = require('express') ;
const app = express() ;

app.use(express.urlencoded({ extended: true }));


app.get('/users',(req , res)=>{
    return res.json({status: " success"}) ;
})

app.post('/users',(req , res)=>{
    return res.status(201).json({status : "success"}) ;
})

app.post('/users/form' , (req , res)=>{
    const body = req.body ;
    if(!body || !body.username || !body.password){
        return res.status(400).json({msg : 'All fields are required'}) ;
    }
    return res.status(200).json({status : 'success'}) ;
})

app.listen(8000 , ()=>{
    console.log('Server Started at 8000') ;
})