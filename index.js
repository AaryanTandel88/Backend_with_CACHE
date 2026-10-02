const express = require("express")
const app = express()
const PORT = 3000
const productsRouter = require("./route/products.router")

app.use(express.json())
app.use('/products',productsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
