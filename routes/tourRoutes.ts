const expressTour = require('express')
const tourRoute = expressTour.Router()
const tourController = require('./../controller/tourController')



tourRoute.param('id',tourController.checkID)
// --> Another method to do the fetch request
// const {getAllTours,createTour,getTours,patchingTour,deleteTour} = require('../controller/tourController')
const toursData = require('../controller/tourController')

tourRoute.route('/').get(toursData.getAllTours).post(toursData.checkBody,toursData.createTour)
tourRoute.route('/:id').get(toursData.getTours).patch(toursData.patchingTour).delete(toursData.deleteTour)
module.exports = tourRoute
