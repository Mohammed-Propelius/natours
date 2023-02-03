const express = require('express');
const expressApp = express.Router();

const tourRouters = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
expressApp.use('/api/v1/tours', tourRouters);
expressApp.use('/api/v1/users', userRoute);

module.exports = expressApp;
