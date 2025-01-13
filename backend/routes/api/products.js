const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    .get(productsController.getAllProducts)
    .post(verifyJWT, productsController.createNewProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct);

router.route('/:id')
    .get(productsController.getProduct);

module.exports = router;