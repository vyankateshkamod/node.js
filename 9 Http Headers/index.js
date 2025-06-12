const express = require('express')
const app = express()
const port = 8000

app.get('/users', (req, res) => {
    res.setHeader("X-MyName" , "Soham Shaikh") ; // Custom header
    // Always add X to custom headers
    console.log(req.headers) ;
    return res.json({msg : "header set"}) ;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
