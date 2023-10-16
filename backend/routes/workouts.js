const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// get all workouts from '/api/workouts'
router.get('/', getWorkouts)

// GET  single workout
// colon represents parameter
router.get('/:id', getWorkout)

// POST new workout
router.post('/', createWorkout)

// DELETE workout
router.delete('/:id', deleteWorkout)

// UPDATE workout
router.patch('/:id', updateWorkout)

module.exports = router
