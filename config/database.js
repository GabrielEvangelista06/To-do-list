import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_HOST, {
    useNewUrlParser: true,
    useUndefinedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });