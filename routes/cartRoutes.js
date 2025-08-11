const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getCart, addToCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const router = express.Router();

router.use(protect); // all routes protected
router.get('/', getCart);
router.post('/', addToCart);               // body: { productId, quantity }
router.put('/:productId', updateCartItem); // body: { quantity }
router.delete('/:productId', removeCartItem);

module.exports = router;
