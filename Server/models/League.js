const mongoose = require('mongoose')

const leagueSchema = mongoose.Schema({
    name:{
        type: String
    },
    teams:[{type:mongoose.Schema.Types.ObjectId, ref:'team'}],
    minTeams:{
        type: Number
    },
    maxTeams:{
        type: Number
    }
})

mongoose.model('league', leagueSchema)

module.exports= mongoose.model('league', leagueSchema)