require("dotenv").config()
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const morgan = require("morgan")
const path = require("path");
const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/apiRoutes")



const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(morgan())
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/workout";

// DATABASE
mongoose.connect("mongodb://localhost/workout",{
  useNewUser: true,
  useUnifiedTopology: true
})

app.use(htmlRoutes)
app.use(apiRoutes)

app.get("/api/workouts", async (req, res) => {
  const allWorkouts = await db.Workout.find({})
  res.json(allWorkouts)
})

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
