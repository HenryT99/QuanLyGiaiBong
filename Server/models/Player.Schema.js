const mongoose = require('mongoose')

const playerSchema=  mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    dateOfBirth:{
        type: Date
    },
    goals:{
        type:Number,
    },
    typePlayer:{
        type: Boolean
    },
    
})

mongoose.model('player', playerSchema)

module.exports= mongoose.model('player', playerSchema)