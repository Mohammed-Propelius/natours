const express = require('express');
const appRoute = express.Router();

const tourRouters = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
appRoute.use('/api/v1/tours', tourRouters);
appRoute.use('/api/v1/users', userRouter);

module.exports = appRoute;
