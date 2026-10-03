const productsDatabase = require("../database/products.db")

const getProducts = async (filters) => {
    let products = await productsDatabase.readDataAfterDelay()
    const name = filters.name ? filters.name.trim().toLowerCase() : ""
    const minPrice = Number(filters.minPrice)
    const maxPrice = Number(filters.maxPrice)

    if (name) {
        products = products.filter((product) => product.name.toLowerCase().includes(name))
    }
    if (filters.minPrice !== undefined && filters.minPrice !== "" && Number.isFinite(minPrice)) {
        products = products.filter((product) => product.price >= minPrice)
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== "" && Number.isFinite(maxPrice)) {
        products = products.filter((product) => product.price <= maxPrice)
    }
    return products
}

const getProductById = async (id) => {
    const products = await productsDatabase.readDataAfterDelay()
    return products.find((product) => product.id === id)
}

const createProduct = async ({ name, price }) => {
    const products = await productsDatabase.readDataAfterDelay()
    const item = {
        id: products.length + 1,
        name,
        price,
    }
    products.push(item)
    await productsDatabase.writeDataToFile(products)
    return item
}


const updateProduct = async (patch, id) => {
    const products = await productsDatabase.readDataAfterDelay()
    const fields = ["name", "price"]
    let item = products.find((product) => product.id === id)

    if (item) {
        fields.forEach((field) => {
            if (patch[field] !== undefined) {
                item[field] = patch[field]
            }
        })
    }
    await productsDatabase.writeDataToFile(products)
    return item
}


const replaceProduct = async (product) => {
    const products = await productsDatabase.readDataAfterDelay()
    const updated = products.map((item) => {
        if (item.id === product.id) {
            return product
        }
        return item
    })
    await productsDatabase.writeDataToFile(updated)
    return product
}


const deleteProduct = async (id) => {
    const products = await productsDatabase.readDataAfterDelay()
    const item = products.find((product) => product.id === id)
    const remaining = products.filter((product) => product.id !== id)
    await productsDatabase.writeDataToFile(remaining)
    return item
}

module.exports = { getProducts, getProductById, createProduct, replaceProduct, updateProduct, deleteProduct }