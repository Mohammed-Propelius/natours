import * as mongoose from 'mongoose';

const tourModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  ratingAverage: { type: Number, default: 4.5 },
  ratingQuantity: { type: Number, default: 0 },
  priceDiscount: {
    type: Number,
  },
  duration: {
    type: Number,
    require: [true, 'A duration is must for tour'],
  },
  difficulty: {
    type: String,
    require: [true, 'A difficulty is required for the tour'],
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A max group size is required'],
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price'],
  },
  summary: {
    type: String,
    trim: true,
    require: [true, 'Tour Description required'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    require: [true, 'Image Cover is Requried'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],
});

module.exports = mongoose.models.Tours || mongoose.model('Tours', tourModel);
