require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

const products = [
  { name: 'Wireless Headphones', description: 'Noise cancelling', price: 1999, stock: 10 },
  { name: 'Gaming Mouse', description: 'RGB, 16000 DPI', price: 1299, stock: 25 },
  { name: 'Mechanical Keyboard', description: 'Blue switches', price: 3499, stock: 15 }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await User.deleteMany({});

    await Product.insertMany(products);
    const adminPass = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Admin', email: 'admin@shoppy.com', password: admin123, isAdmin: true });

    console.log('Seed successful');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
