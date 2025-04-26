const fs = require("fs") ;

console.log(1) ;

// Non-blocking ..  Asynchronous
fs.readFile("./test.txt","utf-8",(err,result)=>{
    if(err){
        console.log("Error",err) ;
    }
    else{
        console.log(result) ;
    }
}) ;

console.log(2) ;