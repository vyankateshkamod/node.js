const express = require("express") ;
const users  = require("./MOCK_DATA.json") ;
const fs = require("fs") ;
const app = express() ;

const PORT = 8000 ;

//Middleware - Plugin
app.use(express.urlencoded({extended:false})) ;

// ROUTES

app.get("/users" , (req,res)=>{
    const html = `
        <ul>
            ${users.map((user)=>`<li> ${user.first_name} </li>`).join("")}
        </ul>
    `
    res.send(html) ;
})

// REST API's
app.get("/api/users",(req,res)=>{
    return res.json(users) ;
})

app.get("/api/users/:id" , (req,res)=>{
    const id = Number(req.params.id) ;
    const user = users.find((user)=> user.id === id) ;
    if(user){
        return res.json(user) ;
    }
    else{
        res.send("User not found") ;
    }
})

app.post("/api/users",(req,res)=>{
    const body = req.body ;
    console.log("Body",body) ;
    users.push({...body , id: users.length + 1}) ;
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success" , id:users.length});
    })
})

app.patch("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id) ;
    const body = req.body ;
    const userIndex = users.findIndex((user)=> user.id === id) ;
    users[userIndex] = {...body , id:id} ;

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success" , id:id});
    })
})

app.delete("/api/users/:id" , (req,res)=>{
    const id = Number(req.params.id) ;
    const userIndex = users.findIndex((user)=> user.id === id) ;
    if(userIndex === -1) return res.send("User not found") ;
    users.splice(userIndex,1) ;
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:id}) ;
    })
})


app.listen(PORT,()=>{
    console.log(`Servert Started at Port : ${PORT}`) ;
})