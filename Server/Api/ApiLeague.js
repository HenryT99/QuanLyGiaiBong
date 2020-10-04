//Api League 
//Get Leagues done
//Get League with ID done
//Add League done

//Update League


const router = require('express').Router()
const League = require('../models/League')
// const teamSchema = require('../models/Team.Schema')
// const playerChema = require('../models/Player.Schema')


router.get('/', (req, res)=>{//Get League No ID
    // League.find((err, league)=>{
    //     return res.json(league)
    // })
    League.find().populate('teams')
    .exec((err, league)=>{
        return res.json(league)
    })
})

router.post('/id',(req, res)=>{//Get League With ID
    League.findOne({_id: req.body.IDLeague},(err, league)=>{
       
    }).populate('teams')
    .exec((err, league)=>{
        if(err) return res.json({message: err.message})
        return res.json({message:'Valid', league: league})
    })
})

router.post('/add',(req, res)=>{//Add League
    try{
        const newLeague = new League({
            name: req.body.name,
            minTeams: req.body.minTeams,
            maxTeams: req.body.maxTeams
        })
        newLeague
        .save()
        .then(() =>{
            return res.json({ message:'Success'})
        })
        
    }
    catch (err) {
        return res.json({ message: err.message })
    }

})


module.exports = router