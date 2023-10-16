const mongoose = require('mongoose')

const Schema= mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, 
// adds timestamps feature
{ timestamps: true })

// create model based on the schema
// create workout collection
module.exports = mongoose.model('Workout', workoutSchema)

