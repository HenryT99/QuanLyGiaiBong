//Api Player
//Get Players
//Get Players on Team done
//Get Player on ID done
//Add Player done
//Update Player

const router = require('express').Router()
const Player = require('../models/Player.Schema')
const Team = require('../models/Team.Schema')
const League = require('../models/League.Schema')

router.post('/id', (req, res) =>{//Find Players with ID
    // Player.findById(req.body.IDPlayer, (err, player)=>{
    //     if(!player) return res.json({ message:'Invalid'})
    //     return res.json({message:'Valid'}, player)
    // })
    League.findById(req.body.IDLeague, (err,league)=>{
        if(!league) return res.json({ message:'Invalid'})

        // const teamIdx = league.teams.find(team=>team.ID === req.body.IDTeam)
        league.teams.forEach(team=>{
            team.forEach(player=>{
                if (player.ID = req.body.ID === req.body.IDPlayer) 
                return  res.json({message:'Found'}, player)
            })
        })
        return res.json({message:'Not found'})
    })
})

router.post('/id_team', (req, res)=>{//Find Player with ID Team
    League.findById(req.body.IDLeague, (err,league)=>{
        if(!league) return res.json({ message:'Invalid'})
        
        const team = league.teams.find(team => team.ID === req.body.IDTeam)
        const player = team.players.find(player => player.ID===req.body.IDPlayer)
        return res.json({ message:'Valid'}, player)
    })
    // Team.findById(req.body.IDTeam).populate('players')
    // .exec((err, team)=>{
    //     if(err) return res.json({ message: 'Error' })
    //     return res.json({message:'Valid'}, team)
    // })
})

router.post('/add', (req, res)=>{//Add Player
    try{
        League.findById(req.body.IDLeague, (err, league)=>{
            const teamIdx = league.teams.findIndex(team=>team.ID === req.body.IDTeam)
            const player = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                typePlayer: req.body.typePlayer,
                numberShirt: req.body.numberShirt,
                goals: 0
            }
            league.teams[teamIdx].push(player)
            league.save()
            .then(() =>{
                return res.json({ message:'Success'})
            })
        })
    }
    catch(err){
        return res.json({ message:err.message})
    }
    
})


module.exports = router