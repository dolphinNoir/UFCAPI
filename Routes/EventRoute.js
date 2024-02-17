const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const UFCModel = require('../Models/UFCModel')


router.get("/", (req,res) => {
    res.json("Welcome to the Events Endpoint")
})

router.get("/FindEventsByFighterName/:FighterName", async (req, res) => {
    try {
        let fighterName = req.params.FighterName
        let limit = req.query.limit

        if (limit && !isNaN(limit)) {
            limit = parseInt(limit);
        } else {
            limit = 20;
        }

        let events = await UFCModel.find({
              $or: [
            { "Fighter 1": fighterName },
            { "Fighter 2": fighterName }
        ]}).limit(limit)

        if(events.length === 0){
            throw new Error("Cannot find any results, try tweaking your search criteria")
        }

        res.json(events)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/FindMatchups/:Fighter1/:Fighter2", async (req,res) => {
    try {
        let fighterOne = req.params.Fighter1
        let fighterTwo = req.params.Fighter2
        let limit = req.query.limit

        if (limit && !isNaN(limit)) {
            limit = parseInt(limit);
        } else {
            limit = 20;
        }

            let events = await UFCModel.find({
                $or: [
                    {"Fighter 1": fighterOne, "Fighter 2": fighterTwo},
                    {"Fighter 1": fighterTwo, "Fighter 2": fighterOne}
                ]
            })

            if(events.length === 0){
                throw new Error("Cannot find any results, try tweaking your search criteria")
            }

            res.json(events)
        

        } 
        
        catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/FindEventsByDateRange/:MinDate/:MaxDate", async (req, res) => {
    try {
        const lowerBound = new Date(req.params.MinDate)
        const upperBound = new Date(req.params.MaxDate)
        let limit = req.query.limit

        if (limit && !isNaN(limit)) {
            limit = parseInt(limit);
        } else {
            limit = 100;
        }

        console.log(lowerBound)
        console.log(upperBound)

        const events = await UFCModel.find({FormattedDate: {$gte: lowerBound, $lte: upperBound}}).limit(limit)

        if(events.length === 0){
            throw new Error("Cannot find any results, try tweaking your search criteria")
        }
        
        res.json(events)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router