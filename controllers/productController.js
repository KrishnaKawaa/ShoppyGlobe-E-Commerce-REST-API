const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { res.status(400); throw new Error('Invalid product ID'); }
  const product = await Product.findById(id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json(product);
});

// Admin create
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, stock } = req.body;
  if (!name || price == null || stock == null) { res.status(400); throw new Error('Missing fields'); }
  const product = await Product.create({ name, price, description, stock });
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { res.status(400); throw new Error('Invalid product ID'); }
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { res.status(400); throw new Error('Invalid product ID'); }
  const product = await Product.findByIdAndDelete(id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json({ message: 'Product removed' });
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
