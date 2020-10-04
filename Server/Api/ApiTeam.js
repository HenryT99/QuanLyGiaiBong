//Api Team
//Get Teams with League ID done
//Get Team with ID
//Add Team done
//Update Team done

const router = require('express').Router()
const League = require('../models/League')
const teamSchema = require('../models/Team.Schema')

router.post('/league_id', (req, res)=>{//Get Team with League ID
    League.findById(req.body.IDLeague).populate('teams')
    .exec((err, league)=>{
        return res.json(league.teams)
    })
})

router.post('/add',(req, res) => {//Add Team
    const IDLeague = req.body.IDLeague
    League.findById(IDLeague,(err, league)=>{
        if(!league) return res.json({ message: 'Invalid' })

        const newTeam = new teamSchema({
            name:req.body.name,
            shortName:req.body.shortName,
            imagePath: req.body.imagePath,
            stadium:req.body.stadium
        })//create Team Schema

        newTeam.save()//Save Team Schema

        league.teams.push(newTeam)//Add Team to League
        league
        .save()
        .then(()=>{
            return res.json({ message: 'Success'})
        })
    })
})

router.post('/update',(req, res)=>{//Update Team
    League.findById(req.body.IDTeam, (err, team)=>{
        team.name = req.body.name,
        team.shortName = req.body.shortName,
        team.stadium = req.body.stadium,
        team.imagePath =req.body.imagePath
    })
})


module.exports = router