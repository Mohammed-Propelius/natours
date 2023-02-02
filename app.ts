const express = require('express')
const expressApp = express()

const tourRoutes  = require('./routes/tourRoutes')
const userRoute = require('./routes/userRoutes')

expressApp.use('/api/v1/tours',tourRoutes)
expressApp.use('/api/v1/users',userRoute)

module.exports = expressApp