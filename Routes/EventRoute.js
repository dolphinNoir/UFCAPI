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
        let events = await UFCModel.find({
              $or: [
            { "Fighter 1": fighterName },
            { "Fighter 2": fighterName }
        ]})

        res.json(events)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router