//Api Team
//Get Teams with League ID done
//Get Team with ID
//Add Team done
//Update Team done

const router = require('express').Router()
const uuid = require('uuid/v4')

const League = require('../models/League')
const teamSchema = require('../models/Team.Schema')

router.post('/league_id', (req, res) => {//Get Teams with League ID
    League.findById(req.body.IDLeague, (err, league) => {
        if (!league) return res.json({ message: 'Invalid' })

        return res.json({ message: 'Valid' }, league.teams)
    })

})

router.post('/add', (req, res) => {//Add Team
    try {
        League.findById(IDLeague, (err, league) => {
            if (!league) return res.json({ message: 'Invalid' })

            const newTeam = {
                ID: uuid(),
                name: req.body.name,
                shortName: req.body.shortName,
                imagePath: req.body.imagePath,
                stadium: req.body.stadium,
                players: [],
                win: 0,
                draw: 0,
                lose: 0,
                home: [],
                away: [],
                imagePath: req.body.imagePath
            }
            league.teams.push(newTeam)
            league.save()
                .then(() => {
                    return res.json({ message: 'Success' })
                })
        })
    }
    catch (err) {
        return res.json({ message: err.message })
    }


})

router.post('/update', (req, res) => {//Update Team
    League.findById(req.body.IDLeague, (err, league) => {
        const team = league.teams.find(team => team.ID === req.body.IDTeam)
        team.name = req.body.name,
        team.shortName = req.body.shortName,
        team.imagePath = req.body.imagePath,
        team.stadium = req.body.stadium,
        //team.imagePath = req.body.imagePath
        league.teams[league.teams.findIndex(team=>team.ID === req.body.IDTeam)] = team
        league.save()
        .then(() =>{
            return res.json({ message:'Success'})
        })
    })
})


module.exports = router