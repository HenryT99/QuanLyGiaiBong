const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/QuanLyGiaiDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }, (err) => {
    if (!err) console.log('MongoDB is connected')
    else console.log("Mongodb isn't connected " + err)
})

require('./User')