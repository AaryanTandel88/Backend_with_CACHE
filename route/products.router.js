const express = require("express")
const productsRouter = express.Router()
const productsController = require("../controller/products.contr")
const productsMiddleware = require("../middleware/products.middleware")

productsRouter.get('/', productsMiddleware.cacheProductResponses, productsController.listProducts)
productsRouter.get('/:id', productsMiddleware.cacheProductResponses, productsController.getProductById)
productsRouter.post('/', productsMiddleware.validateProductRequest, productsMiddleware.cacheProductResponses, productsController.createProduct)
productsRouter.put('/:id', productsMiddleware.cacheProductResponses, productsController.replaceProduct)
productsRouter.patch('/:id', productsMiddleware.cacheProductResponses, productsController.updateProduct)
productsRouter.delete('/:id', productsMiddleware.cacheProductResponses, productsController.removeProduct)

module.exports = productsRouter