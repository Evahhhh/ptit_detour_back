const express = require('express');
const router = express.Router();
const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activities');

const { protect } = require('../middlewares/auth');

router
  .route('/activities')
  .get(protect, getActivities);

router
  .route('/activity')
  .post(protect, createActivity);

router
  .route('/activity/:id')
  .get(protect, getActivity)
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
