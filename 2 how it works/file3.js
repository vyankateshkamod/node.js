const os = require("os") ;
console.log(os.platform())
console.log(os.type()) ;
console.log(os.hostname()) ;
console.log(os.cpus().length) ; // tells the cores present in cpu
console.log(os.arch()) ;
console.log(os.uptime()) ;
console.log(os.userInfo()) ;
console.log(os.networkInterfaces()) ;