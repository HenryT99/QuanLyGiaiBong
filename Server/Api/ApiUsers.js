//Api User on Server

const router = require('express').Router()
const bcrypt = require('bcrypt')//Hash password
const User = require('../models/User')


router.get('/', (req, res) => {
    
    User.find((err, users)=>{
        return res.json({
            users: users
        })
    })
})
//Register
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user !== null) {//User existes
            console.log(user)
            res.json({ message: 'Error' })
        }
        else {//Add User if doesnt exist
            const newUser = new User({
                
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                can_add: false,
                can_edit: false,
                admin: false,
            })
            bcrypt.genSalt(10, (err, salt) => {// Hash password
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        
                        return res.json({ message: err  }) }
                    else{
                        newUser.password = hash //Add Hash password
                    newUser
                        .save()//Save New User
                        .then(user => {
                            return res.json({ message: 'Success' })
                        })
                    }
                    
                })
            })
        }
    })
})
//Login
router.post('/login', (req, res)=>{//Login
    const email = req.body.email
    const password = req.body.password
    User.findOne({email: email})
    .then(user=>{
        if(user){
            var bool = bcrypt.compareSync(req.body.password, user.password)
            if(bool === true){// Correct User
                return res.json({
                    message:'Success',
                    user: user
                })
            }
            return res.json({ //Incorrect User
                message:'Incorrect'
            })
        }
        else{
            return res.json({
                message: "Null"
            })
        }
    })

})
//Update
router.post('/update', async(req, res)=>{
    const user = await User.findOne({email: req.body.email});
    user.lastName = req.body.lastName
    user.firstName = req.body.firstName
    bcrypt.genSalt(10, (err, salt) => {// Hash password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                
                return res.json({ message: err  }) }
            else{
                user.password = hash //Add Hash password
            }
            
        })
    })
    user.can_add = req.body.add
    user.can_add = req.body.edit
    user.admin = req.body.isAdmin
    newUser
    .save()//Save New User
    .then(user => {
        return res.json({ message: 'Done' })
    })
})

module.exports = router