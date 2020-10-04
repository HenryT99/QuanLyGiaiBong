const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String
    },
    shortName: {
        type: String
    },
    stadium: {
        type: String
    },
    players:[{type: mongoose.Types.ObjectId, ref:'player'}]
    ,
    win: {
        type: Number,
        default: 0
    },
    draw: {
        type: Number,
        default: 0
    },
    lose: {
        type: Number,
        default: 0
    },
    home: {
        type:Array
    },
    away:{
        type: Array
    },
    imagePath: {
        type: String,
        default: ""
    }
})

mongoose.model('team', teamSchema)

module.exports= mongoose.model('team', teamSchema)