const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./server/models/User');

dotenv.config({ path: './server/.env' });

const addUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const email = 'rohan@123.com';
    const password = 'rohan@123';
    const name = 'Rohan';

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists!');
      process.exit();
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    console.log('User created successfully:');
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${password}`);

    process.exit();
  } catch (error) {
    console.error('Error adding user:', error.message);
    process.exit(1);
  }
};

addUser();
