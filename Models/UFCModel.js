const mongoose = require('mongoose')

const UFCModel = new mongoose.Schema({
    Location: String,
    "Fighter 1": String,
    "Fighter 2": String,
    "Fighter_1_KD": Number,
    "Fighter_2_KD": Number,
    "Fighter_1_STR": Number,
    "Fighter_2_STR": Number,
    "Fighter_1_TD": Number,
    "Fighter_2_TD": Number,
    "Fighter_1_SUB": Number,
    "Fighter_2_SUB": Number,
    WeightClass: String,
    Method: String,
    Round: Number,
    Time: String,
    EventName: String,
    Date: String,
    Winner: String
})

module.exports = mongoose.model('UFCData', UFCModel, 'UFCData')