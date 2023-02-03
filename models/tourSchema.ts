import * as mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a Name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a Price'],
  },
});

export const toursModel = mongoose.model('Tour', tourSchema);
