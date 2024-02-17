require("dotenv").config()
const port = process.env.PORT;
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')

const EventsRouter = require("./Routes/EventRoute.JS")
const FighterRouter = require("./Routes/FighterRoute")
const FilterRouter = require("./Routes/FilterRoute")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;

app.use("/Fighters", FighterRouter)
app.use("/Events", EventsRouter)
app.use("/Filter", FilterRouter)

db.on('error', (error) => {console.log(error)})
db.once('open', () => {console.log("Connected to DB")})

app.get("/", (req,res) => {
    res.json("Welcome to the UFC Data API, head to the /Fighters endpoint for fighter information, head to the /Events endpoint for event information, enjoy :) ")
})

app.listen(port, () => console.log(`started server on port ${port}`));
 
process.on('SIGINT', () => {
    db.close(() => {
      console.log('MongoDB connection closed due to application termination');
      process.exit(0);
    });
  });