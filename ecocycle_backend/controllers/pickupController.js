const PickupRequest = require('../models/PickupRequest');
const User = require('../models/User');

// ============================================================
// CREATE HOUSEHOLD PICKUP REQUEST
// ============================================================
const createPickupRequest = async (req, res) => {
  try {
    if (req.user.role !== 'household') {
      return res.status(403).json({
        message: 'Only household users can create pickup requests',
      });
    }

    const {
      itemName,
      category,
      quantity,
      address,
      preferredDate,
      notes,
      imageUrl,
    } = req.body;

    if (
      !itemName ||
      !category ||
      !quantity ||
      !address ||
      !preferredDate
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields',
      });
    }

    const householdUser = await User.findById(req.user.userId);

    if (!householdUser) {
      return res.status(404).json({
        message: 'Household user not found',
      });
    }

    const pickupRequest = await PickupRequest.create({
      household: householdUser._id,
      itemName,
      category,
      quantity,
      address,
      preferredDate,
      notes: notes || '',
      imageUrl: imageUrl || '',
      status: 'Pending',
    });

    res.status(201).json({
      message: 'Pickup request created successfully',
      request: pickupRequest,
    });
  } catch (error) {
    console.error('Create pickup request error:', error);

    res.status(500).json({
      message: 'Server error while creating pickup request',
    });
  }
};

// ============================================================
// HOUSEHOLD - GET MY PICKUP REQUESTS
// ============================================================
const getMyPickupRequests = async (req, res) => {
  try {
    if (req.user.role !== 'household') {
      return res.status(403).json({
        message: 'Only household users can view these requests',
      });
    }

    const requests = await PickupRequest.find({
      household: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: 'Pickup requests fetched successfully',
      requests,
    });
  } catch (error) {
    console.error('Get pickup requests error:', error);

    res.status(500).json({
      message: 'Server error while fetching pickup requests',
    });
  }
};

// ============================================================
// COLLECTOR - GET ALL PICKUP REQUESTS
// ============================================================
const getCollectorPickupRequests = async (req, res) => {
  try {
    if (req.user.role !== 'collector') {
      return res.status(403).json({
        message: 'Only collectors can view pickup requests',
      });
    }

    const requests = await PickupRequest.find()
      .populate('household', 'name email phone')
      .populate('collector', 'name email phone')
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message: 'Collector pickup requests fetched successfully',
      requests,
    });
  } catch (error) {
    console.error('Get collector pickup requests error:', error);

    res.status(500).json({
      message: 'Server error while fetching collector requests',
    });
  }
};

// ============================================================
// COLLECTOR - ACCEPT / ASSIGN PICKUP
// ============================================================
const assignPickupRequest = async (req, res) => {
  try {
    if (req.user.role !== 'collector') {
      return res.status(403).json({
        message: 'Only collectors can accept pickup requests',
      });
    }

    const pickupRequest = await PickupRequest.findById(req.params.id);

    if (!pickupRequest) {
      return res.status(404).json({
        message: 'Pickup request not found',
      });
    }

    if (pickupRequest.status !== 'Pending') {
      return res.status(400).json({
        message: 'Only pending pickup requests can be accepted',
      });
    }

    pickupRequest.collector = req.user.userId;
    pickupRequest.status = 'Collector Assigned';

    await pickupRequest.save();

    res.status(200).json({
      message: 'Pickup request accepted successfully',
      request: pickupRequest,
    });
  } catch (error) {
    console.error('Assign pickup request error:', error);

    res.status(500).json({
      message: 'Server error while accepting pickup request',
    });
  }
};

// ============================================================
// COLLECTOR - UPDATE PICKUP STATUS
// ============================================================
const updatePickupStatus = async (req, res) => {
  try {
    if (req.user.role !== 'collector') {
      return res.status(403).json({
        message: 'Only collectors can update pickup status',
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      'Collector Assigned',
      'Pickup Scheduled',
      'Picked Up',
      'Sent to Recycler',
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid pickup status',
      });
    }

    const pickupRequest = await PickupRequest.findById(req.params.id);

    if (!pickupRequest) {
      return res.status(404).json({
        message: 'Pickup request not found',
      });
    }

    if (
      pickupRequest.collector &&
      pickupRequest.collector.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({
        message: 'You are not assigned to this pickup request',
      });
    }

    pickupRequest.collector = req.user.userId;
    pickupRequest.status = status;

    await pickupRequest.save();

    res.status(200).json({
      message: 'Pickup status updated successfully',
      request: pickupRequest,
    });
  } catch (error) {
    console.error('Update pickup status error:', error);

    res.status(500).json({
      message: 'Server error while updating pickup status',
    });
  }
};

// ============================================================
// RECYCLER - GET E-WASTE SENT TO RECYCLER
// ============================================================
const getRecyclerPickupRequests = async (req, res) => {
  try {
    if (req.user.role !== 'recycler') {
      return res.status(403).json({
        message: 'Only recyclers can view recycler requests',
      });
    }

    const requests = await PickupRequest.find({
      status: 'Sent to Recycler',
    })
      .populate('household', 'name email phone')
      .populate('collector', 'name email phone')
      .sort({
        updatedAt: -1,
      });

    res.status(200).json({
      message: 'Recycler requests fetched successfully',
      requests,
    });
  } catch (error) {
    console.error('Get recycler requests error:', error);

    res.status(500).json({
      message: 'Server error while fetching recycler requests',
    });
  }
};

// ============================================================
// RECYCLER - COMPLETE RECYCLING
// ============================================================
const completeRecyclerRequest = async (req, res) => {
  try {
    if (req.user.role !== 'recycler') {
      return res.status(403).json({
        message: 'Only recyclers can complete requests',
      });
    }

    const pickupRequest = await PickupRequest.findById(req.params.id);

    if (!pickupRequest) {
      return res.status(404).json({
        message: 'Pickup request not found',
      });
    }

    if (pickupRequest.status !== 'Sent to Recycler') {
      return res.status(400).json({
        message:
          'Only requests sent to the recycler can be completed',
      });
    }

    pickupRequest.status = 'Completed';

    await pickupRequest.save();

    res.status(200).json({
      message: 'E-waste recycling completed successfully',
      request: pickupRequest,
    });
  } catch (error) {
    console.error('Complete recycler request error:', error);

    res.status(500).json({
      message: 'Server error while completing recycling',
    });
  }
};

// ============================================================
// EXPORT CONTROLLERS
// ============================================================
module.exports = {
  createPickupRequest,
  getMyPickupRequests,
  getCollectorPickupRequests,
  assignPickupRequest,
  updatePickupStatus,
  getRecyclerPickupRequests,
  completeRecyclerRequest,
};