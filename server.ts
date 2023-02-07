const mongoose = require('mongoose');
const dotenv = require('dotenv');
const indexRoute = require('./app');
const expressServer = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
dotenv.config({ path: './.env' });

const app = expressServer();
const DB =
  (process.env.DATABASE as string) &&
  (process.env.DATABASE as string).replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD as string
  );
mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => console.log('DB Connected'));
app.use(expressServer.json());
app.use('/', indexRoute);

const port = 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
