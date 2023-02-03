const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const expressImport = require('express');
const app = expressImport();

const DB =
  process.env.DATABASE &&
  process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD as string
  );

mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewURLParser: true,
  })
  .then((connect: any) => {
    console.log('Connection', connect.connections);
  });

const port = 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
