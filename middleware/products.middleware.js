const responseCache = {}

const cacheProductResponses = async (req,res,next) => {
    const url = req.originalUrl
    const cache = responseCache[url]

    if (req.method !== "GET") {
        Object.keys(responseCache).forEach((key) => {
            if (responseCache[key] && key.startsWith("/products")) {
                delete responseCache[key]
            }
        })
        next()
        return
    }

    if (cache && Date.now() <= cache.expiresAt) {
        res.set("cache", "HIT")
        return res.json(cache.data)
    }

    if (cache && Date.now() > cache.expiresAt) {
        delete responseCache[url]
    }

    res.set("cache", "MISS")
    const jsonFn = res.json.bind(res)
    res.json = (body) => {
        responseCache[url] = {
            data: body,
            expiresAt: Date.now() + (50*1000),
        }
        return jsonFn(body)
    }
    next()
}

const validateProductRequest = (req, res, next) => {
    const { name, price } = req.body
    if (name === undefined || name.trim() === "" || !Number.isInteger(price)) {
        return res.status(400).send("error")
    }
    next()
}

module.exports = {cacheProductResponses, validateProductRequest }