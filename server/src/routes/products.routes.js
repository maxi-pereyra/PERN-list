const { Router } = require('express')
//const pool = require('../db.js')
const { getAllProducts,
    getProducts,
    createProducts,
    deleteProducts,
    upDateProducts } = require('../controllers/products.controllers');

const {getProductsFrom,
    editJson,
    deleteJson
} = require('../controllers/generaLista')

const router = Router();

router.get('/', getAllProducts)    

router.get('/products/:id', getProducts)

router.post('/products', createProducts)

router.delete('/products/:id', deleteProducts)

router.put('/products/:id', upDateProducts)

router.get('/api-lista',getProductsFrom)

router.put('/edit-product-json',editJson)

router.delete('/delete-product-json',deleteJson)

module.exports = router