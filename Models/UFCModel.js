const mongoose = require('mongoose')

const UFCModel = new mongoose.Schema({
Location : String,
Fighter1 : String,
Fighter2 : String,
Fighter1KD: Number,
Fighter2KD: Number,
Fighter1STR: Number,
Fighter2STR: Number,
Fighter1TD: Number,
Fighter2TD: Number,
Fighter1SUB: Number,
Fighter2SUB: Number,
Weight_Class: String,
Method: String,
Round: Number,
Time: String,
EventName: String,
Date: String,
Winner: String
})

module.exports = mongoose.model('UFCData', UFCModel, 'UFCData')