const expressRouter = require('express');
const {
  getAllTours,
  createTour,
  getTours,
  updateTour,
  deleteTour,
} = require('../controller/tourController');

const router = expressRouter.Router();

router.route('/').post(createTour).get(getAllTours);
// router.post('/', createTour);
router.route('/:id').get(getTours).patch(updateTour).delete(deleteTour);

module.exports = router;
