require("dotenv").config()

const express = require("express")
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")

// express app
const app = express()

// global middleware - handles any type of request

// attach data passed to app to req so it can be used
app.use(express.json())
// next is a function to invoke the next handler
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// route handler for HTTP request - triggered when user accesses root of app
// req: contains info about the request, req: used to send response back to client
// app.get('/', (req, res) => {
//     res.json({msg: 'Welcome to the app'})
// })

// attach all the workout routes to app allowing the app to handle HTTP reqs
// '/api/workouts' is a path to an API endpoint to which the express app have access
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

// connect to db
// asynchronous (returns a promise)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port ", process.env.PORT)
    })
  })
  .catch((e) => {
    console.log(e)
  })
