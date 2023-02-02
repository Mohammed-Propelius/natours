const express = require('express')
const expressApp = express()

const tourRoutes  = require('./routes/tourRoutes')
const userRoutes = require('./routes/userRoutes')

expressApp.use('/api/v1/tours',tourRoutes)
expressApp.use('/api/v1/users',userRoutes)

module.exports = expressApp