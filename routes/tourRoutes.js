const express = require('express')
const tourRoute = express.Router()
const {getAllTours,createTour,getTours,patchingTour,deleteTour} = require('../controller/tourController')


tourRoute.route('/').get(getAllTours).post(createTour)
tourRoute.route('/:id').get(getTours).patch(patchingTour).delete(deleteTour)
module.exports = tourRoute
