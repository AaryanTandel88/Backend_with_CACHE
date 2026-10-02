const productService = require("../service/products.service")

const listProducts = async (req, res) => {
    const products = await productService.getProducts(req.query)
    res.json(products)
}

const getProductById = async (req, res) => {
    const id = Number(req.params.id)
    const product = await productService.getProductById(id)
    res.json(product)
}

const createProduct = async (req, res) => {
    const created = await productService.createProduct(req.body)
    res.status(201).json(created)
}

const replaceProduct = async (req, res) => {
    const id = Number(req.params.id)
    const price = Number(req.body.price)
    const name = req.body.name
    const updated = await productService.replaceProduct({ id, name, price })
    res.status(200).json(updated)
}

const updateProduct = async (req, res) => {
    const id = Number(req.params.id)
    const updated = await productService.updateProduct(req.body, id)
    res.status(200).json(updated)
}

const removeProduct = async (req, res) => {
    const id = Number(req.params.id)
    const deleted = await productService.deleteProduct(id)
    res.status(200).json(deleted)
}

module.exports = {
    listProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    removeProduct,
}