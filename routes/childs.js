const express = require('express');
const router = express.Router();
const {
  getChildren,
  getChild,
  createChild,
  updateChild,
  deleteChild
} = require('../controllers/childs');

const { protect } = require('../middlewares/auth');

router
  .route('/childs')
  .get(protect, getChildren)
  .post(protect, createChild);

router
  .route('/childs/:id')
  .get(protect, getChild)
  .put(protect, updateChild)
  .delete(protect, deleteChild);

module.exports = router;
