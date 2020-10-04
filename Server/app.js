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

const user = require('./Api/ApiUsers')//User API
const league = require('./Api/ApiLeague') //League API
const team = require('./Api/ApiTeam')
const player = require('./Api/ApiPlayer')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.use('/api/users', user)
app.use('/api/leagues', league)
app.use('/api/teams', team)
app.use('/api/players', player)

app.get('/', (req, res)=>{
    res.json({
        message:'Welcome to Admin Page'
    })
})

app.listen(4000,()=>{
    console.log('Server started')
})