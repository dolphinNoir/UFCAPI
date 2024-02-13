const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const UFCModel = require('../Models/UFCModel')


router.get("/", (req,res) => {
    res.json("Welcome to the Fighters Endpoint")
})

router.get("/FindStatsByFighterName/:FighterName", async (req, res) => {
    try {
        let fighterName = req.params.FighterName
        let stats = await UFCModel.find({
              $or: [
            { "Fighter 1": fighterName },
            { "Fighter 2": fighterName }
        ]})

        res.json(stats)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



module.exports = router