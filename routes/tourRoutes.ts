const expressRoutes = require('express');
const tourController = require('../controller/tourController');
const {
  getAllTours,
  createTour,
  getTours,
  updateTour,
  deleteTour,
} = require('../controller/tourController');
const tourRouter = expressRoutes.Router();

tourRouter.route('/:id', tourController.checkID);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTours).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
