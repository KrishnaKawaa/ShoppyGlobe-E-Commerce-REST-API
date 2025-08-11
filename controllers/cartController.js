const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { user: req.user._id, items: [] });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) { res.status(400); throw new Error('Invalid productId'); }
  const prod = await Product.findById(productId);
  if (!prod) { res.status(404); throw new Error('Product not found'); }
  if (quantity < 1) { res.status(400); throw new Error('Quantity must be at least 1'); }
  if (quantity > prod.stock) { res.status(400); throw new Error('Requested quantity exceeds stock'); }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) {
    const newQty = existing.quantity + quantity;
    if (newQty > prod.stock) { res.status(400); throw new Error('Total quantity exceeds stock'); }
    existing.quantity = newQty;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  const populated = await cart.populate('items.product').execPopulate();
  res.json(populated);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) { res.status(400); throw new Error('Invalid productId'); }
  if (quantity == null || quantity < 0) { res.status(400); throw new Error('Quantity must be >= 0'); }

  const prod = await Product.findById(productId);
  if (!prod) { res.status(404); throw new Error('Product not found'); }
  if (quantity > prod.stock) { res.status(400); throw new Error('Requested quantity exceeds stock'); }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error('Cart not found'); }

  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (itemIndex === -1) { res.status(404); throw new Error('Item not in cart'); }

  if (quantity === 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }
  await cart.save();
  const populated = await cart.populate('items.product').execPopulate();
  res.json(populated);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) { res.status(400); throw new Error('Invalid productId'); }
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error('Cart not found'); }
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  const populated = await cart.populate('items.product').execPopulate();
  res.json(populated);
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
