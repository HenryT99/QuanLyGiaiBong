//Project QuanLyGiaiBong
//Start 06:00PM 04/10/2020
//End
//Server
//Language NodeJS
//DB LocalHost MongoDB


require('./models/db')  // Require MongoDB
const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const user = require('./Api/ApiUsers')

app.use(bodyParser.json())

app.use('/api/users', user)

app.get('/', (req, res)=>{
    res.json({
        message:'Welcome to Admin Page'
    })
})

app.listen(4000,()=>{
    console.log('Server started')
})