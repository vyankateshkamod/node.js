const http = require("http") ;
const fs = require("fs")
const url = require("url")

const myserver = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end() ;
    const log = `${Date.now()} : New Req Received from ${req.url}}\n` ;
    const myUrl = url.parse(req.url,true) ;
    console.log(myUrl) ;
    fs.appendFile("log.txt" , log , (err,data)=>{
        switch(myUrl.pathname){
            case '/' : 
                res.end("home page") ;
                break ;
            case '/about' : 
                const username = myUrl.query.myname ;
                res.end(`Hi,${username}`) ;
                break ;
            case '/search' :
                const search = myUrl.query.search_query ;
                res.end("Here are results for "+ search) ;
                break ;
            default : 
                res.end("404 Not found") ;
        }
    })
})

myserver.listen(8000,()=>{
    console.log("Server Started !") ;
})