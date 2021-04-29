const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");


// Listado de productos
router.get("/", productController.list);

// Formulario de creación de productos (productCart.html)
router.get('/create', productController.productCreate);

// Guarda el nuevo producto Create (productCart.html)
router.post('/products', productController.productSaveNew);

// Carrito de compras (productCart.html)
router.get('/productCart', productController.productCart);

// Formulario de creación de productos
router.get('/:id/edit', productController.productEdit);

// Acción de edición
router.put('/:id', productController.productSave);

// Detalle de producto según :id
router.get("/:id", productController.productDetail);

// PENDIENTE RUTA PARA ELIMINAR PRODUCTOS


module.exports = router;