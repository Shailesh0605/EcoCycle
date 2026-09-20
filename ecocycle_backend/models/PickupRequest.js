const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      default: '',
    },

    // Supabase image URL
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: [
        'Pending',
        'Collector Assigned',
        'Pickup Scheduled',
        'Picked Up',
        'Sent to Recycler',
        'Completed',
      ],
      default: 'Pending',
    },

    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);