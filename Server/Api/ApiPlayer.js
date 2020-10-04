//Api Player
//Get Players
//Get Players on Team done
//Get Player on ID done
//Add Player
//Update Player

const router = require('express').Router()
const Player = require('../models/Player.Schema')
const Team = require('../models/Team.Schema')
const { route } = require('./ApiLeague')

router.post('/id', (req, res) =>{
    Player.findById(req.body.IDPlayer, (err, player)=>{
        if(!player) return res.json({ message:'Invalid'})
        return res.json({message:'Valid'}, player)
    })
})

router.post('/id_team', (req, res)=>{
    Team.findById(req.body.IDTeam).populate('players')
    .exec((err, team)=>{
        if(err) return res.json({ message: 'Error' })
        return res.json({message:'Valid'}, team)
    })
})

router.post('/add', (req, res)=>{
    try{
        Team.findById(req.body.IDTeam, (err, team)=>{
            const newPlayer = new Player({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                typePlayer: req.body.typePlayer,
            })
            newPlayer.save()
            team.players.push(newPlayer)
                team.save()
                .then(()=>{
                    return res.json({message:'Success'})
                })
        });
        
    }
    catch(err){
        return res.json({ message:err.message})
    }
    
})

module.exports = router