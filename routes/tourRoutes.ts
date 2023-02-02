const expressTour = require('express')
const tourRoute = expressTour.Router()

// --> Another method to do the fetch request
// const {getAllTours,createTour,getTours,patchingTour,deleteTour} = require('../controller/tourController')
const toursData = require('../controller/tourController')

tourRoute.route('/').get(toursData.getAllTours).post(toursData.createTour)
tourRoute.route('/:id').get(toursData.getTours).patch(toursData.patchingTour).delete(toursData.deleteTour)
module.exports = tourRoute
