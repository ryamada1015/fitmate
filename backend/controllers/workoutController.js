const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  // get all workouts in the order of created time
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

  // send all the workouts back to client
  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  // req.params stores all the router parameters
  const { id } = req.params

  // if id not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(400).json({ error: "No such workout" })
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push("title")
  }
  if (!load) {
    emptyFields.push("load")
  }
  if (!reps) {
    emptyFields.push("reps")
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields })
  }

  // add doc to db
  try {
    // this is an async operation - await for Workout doc to be created
    // Workout doc and its id are stored in the workout variable
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  // if id not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" })
  }

  const workout = await Workout.findOneAndDelete({ _id: id })

  if (!workout) {
    return res.status(400).json({ error: "No such workout" })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  // if id not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" })
  }

  // ... spreads req object into properties
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!workout) {
    return res.status(400).json({ error: "No such workout" })
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
}
