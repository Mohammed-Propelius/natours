const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressImport = require('express');
const app = expressImport();
const Tour = require('./models/tourSchema');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const DB =
  (process.env.DATABASE as string) &&
  (process.env.DATABASE as string).replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD as string
  );

const testTour = new Tour.toursModel({
  name: 'The Mountianer',
  rating: 5.2,
  price: 497,
});

testTour
  .save()
  .then((data: string | number) => {
    console.log(data, 'TEST ==');
  })
  .catch((err: string) => {
    console.log(err);
  });
dotenv.config({ path: './.env' });
mongoose.set('strictQuery', false);

mongoose.connect(DB);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
