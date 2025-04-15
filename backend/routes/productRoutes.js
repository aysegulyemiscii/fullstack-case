const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getAll, create, update } = require('../controllers/productController');
const validate = require('../middlewares/validate');
const { productSchema } = require('../validations/productValidation');

router.get('/', auth, getAll);
router.post('/', auth, validate(productSchema), create);
router.put('/:id', auth, validate(productSchema), update);

module.exports = router;
