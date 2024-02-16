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
        let events = await UFCModel.find({
              $or: [
            { "Fighter 1": fighterName },
            { "Fighter 2": fighterName }
        ]})


        const statsModel = {
            TotalFights: 0,
            Wins : 0,
            WinRate: String,
            AvgKnockdowns: 0,
            "KOs/TKOs": 0,
            AvgSignificantStrikes: 0,
            AvgTakedowns: 0,
            AvgSubmissionAttempts: 0
        }

        const wins = events.filter(event => event.Winner === fighterName).length;
        const KOs = events.filter(event => event.Method.includes("KO/TKO")).length

        var totalSigStrikes = 0
        var totalKnockdowns = 0
        var totalTakedowns = 0
        var totalSubmissionAttempts = 0
        var totalFights = 0

        let calculateAverage = async (events) => {
            try {
                if (events.length > 0){
                events.forEach(event => {
    
                    if(event["Fighter 1"] = fighterName){
                        totalSigStrikes += event["Fighter_1_STR"]
                        totalKnockdowns += event["Fighter_1_KD"]
                        totalTakedowns += event["Fighter_1_TD"]
                        totalSubmissionAttempts += event["Fighter_1_SUB"]
                        totalFights += 1
                    }
        
                    else if(event["Fighter 2"] = fighterName){
                        totalSigStrikes += event["Fighter_2_STR"]
                        totalKnockdowns += event["Fighter_1_KD"]
                        totalTakedowns += event["Fighter_2_TD"]
                        totalSubmissionAttempts += event["Fighter_2_SUB"]
                        totalFights += 1
                    }

                    else{
                        throw error
                    }
        
                })
                var sigStrikes = totalSigStrikes / totalFights
                var knocks = totalKnockdowns / totalFights
                var takedowns = totalTakedowns / totalFights
                var submissions = totalSubmissionAttempts / totalFights
                var winPercentage = wins / totalFights

                statsModel.TotalFights = totalFights
                statsModel.Wins = wins
                statsModel.WinRate = `${Number(winPercentage.toPrecision(3))}%`
                statsModel["KOs/TKOs"] = KOs
                statsModel.AvgSignificantStrikes =  Number(sigStrikes.toPrecision(3))
                statsModel.AvgKnockdowns = Number(knocks.toPrecision(3))
                statsModel.AvgTakedowns = Number(takedowns.toPrecision(3))
                statsModel.AvgSubmissionAttempts = Number(submissions.toPrecision(3))
               
                return statsModel
            }
            else{
                throw new Error("Cannot find fighter")
            }

            } catch (error) {
                throw new Error(error)
            }
        }
        
    
        let Statistics = await calculateAverage(events)


        res.json({name: fighterName, Statistics})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})





module.exports = router