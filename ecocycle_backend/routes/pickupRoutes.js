const express = require('express');

const protect = require('../middleware/authMiddleware');

const {
  createPickupRequest,
  getMyPickupRequests,
  getCollectorPickupRequests,
  assignPickupRequest,
  updatePickupStatus,
  getRecyclerPickupRequests,
  completeRecyclerRequest,
} = require('../controllers/pickupController');

const router = express.Router();

console.log('Pickup routes loaded successfully');


// ============================================================
// HOUSEHOLD
// ============================================================

router.post('/', protect, createPickupRequest);

router.get('/my', protect, getMyPickupRequests);


// ============================================================
// COLLECTOR
// ============================================================

router.get(
  '/collector',
  protect,
  getCollectorPickupRequests
);

router.put(
  '/:id/assign',
  protect,
  assignPickupRequest
);

router.put(
  '/:id/status',
  protect,
  updatePickupStatus
);


// ============================================================
// RECYCLER
// ============================================================

router.get(
  '/recycler',
  protect,
  getRecyclerPickupRequests
);

router.put(
  '/:id/complete',
  protect,
  completeRecyclerRequest
);


module.exports = router;