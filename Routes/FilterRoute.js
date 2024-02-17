const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const UFCModel = require("../Models/UFCModel")

router.get("/", async (req, res) => {
    try {
        const {fighter1, fighter2, weightClass, minDate, maxDate, winner, location, winMethod, limit} = req.query

        const query = {};
        if (fighter1) query.fighter1 = fighter1;
        if (fighter2) query.fighter2 = fighter2;
        if (weightClass) query.weightClass = weightClass;
        if (minDate) query.date = { $gte: new Date(minDate) };
        if (maxDate) {
            query.date = query.date || {};
            query.date.$lte = new Date(maxDate);
        }
        if (winner) query.winner = winner;
        if (location) query.location = location;

        let mongooseQuery = UFCModel.find();

        if (fighter1 && fighter2){
            mongooseQuery.or([{"Fighter 1": fighter1, "Fighter 2": fighter2}, {"Fighter 2": fighter1, "Fighter 1": fighter2}])
        }

        if(fighter1 && !fighter2){
            mongooseQuery.or([{"Fighter 1": fighter1}, {"Fighter 2": fighter1}])
        }

        if(fighter2 && !fighter1) {mongooseQuery.or([{"Fighter 1": fighter2}, {"Fighter 2": fighter2}])}

        if (weightClass) mongooseQuery = mongooseQuery.where('Weight_Class').equals(weightClass);

        if(winMethod){
            if (winMethod === "KO/TKO") {mongooseQuery = mongooseQuery.where({ Method: /KO\/TKO/ })}
            else if(winMethod === "SUB"){mongooseQuery = mongooseQuery.where({ Method: /SUB/ })}
            else if(winMethod === "DEC"){mongooseQuery = mongooseQuery.where({Method: /DEC/})}
        }

        if (winner) mongooseQuery = mongooseQuery.where("Winner").equals(winner);
        if (limit) mongooseQuery = mongooseQuery.limit(parseInt(limit));

        const results = await mongooseQuery.exec();

        if(results.length === 0){
            throw new Error("Cannot find any results, try tweaking your filter criteria")
        }
        res.json(results)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



module.exports = router