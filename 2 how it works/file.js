const fs = require("fs") ;
console.log(1) ;
// blocking .. Synchronous
const result = fs.readFileSync("./test.txt","utf-8") ;
console.log(result) ;
console.log(2) ;