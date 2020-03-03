const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/api/workouts", async (req, res) => {
    const allWorkouts = await db.Workout.find({})
    res.json(allWorkouts)
})

router.put("/api/workouts/:id", async (req, res) => {
    console.log(req.params)
    // res.send(req.params)
    console.log(req.body)
    // res.json({
    //     params: req.params,
    //     body: req.body
    // })

    const workoutID = req.params.id
    console.log("WORKOUT ID", workoutID)
    const newExercise = req.body
    const idQuery = { _id: workoutID}
    const update = { $push:{ exercises: newExercise }}
    const updatedWorkout = await db.Workout.findByIdAndUpdate(idQuery,update)
    res.json(updatedWorkout)
})

// CREATE 
router.post("/api/workouts", async (req, res) => {
    const newWorkout = await db.Workout.create({})
    console.log("CREATED WORKKOUTTTTTT", newWorkout)
    res.json(newWorkout)
})

// GET RANGE 
router.get("/api/workouts/range", async (req, res) => {
    const allWorkouts = await db.Workout.find({})
    res.json(allWorkouts)
})

module.exports = router;