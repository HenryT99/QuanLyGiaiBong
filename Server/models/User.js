const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    can_add:{
        type:Boolean
    },
    admin:{
        type:Boolean
    },
    can_edit:{
        type:Boolean
    }
})

mongoose.model('user', userSchema)

module.exports= mongoose.model('user', userSchema)