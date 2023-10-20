const express = require("express")
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// check auth before proceeding to any of the workout routes
router.use(requireAuth)

// get all workouts from '/api/workouts'
router.get("/", getWorkouts)

// GET  single workout
// colon represents parameter
router.get("/:id", getWorkout)

// POST new workout
router.post("/", createWorkout)

// DELETE workout
router.delete("/:id", deleteWorkout)

// UPDATE workout
router.patch("/:id", updateWorkout)

module.exports = router
