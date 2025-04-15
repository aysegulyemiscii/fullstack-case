// controllers/productController.js
const { Product } = require('../models');

const getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

const create = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.create({ name, description, price });
  res.json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.set({ name, description, price });
  await product.save();
  res.json(product);
};

module.exports = { getAll, create, update };
