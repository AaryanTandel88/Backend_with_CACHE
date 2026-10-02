const fs = require("fs/promises")
const path = require("path")
const filePath = path.join(__dirname,"db.json")

const readData = async() => {
    try {
        let rawData = await fs.readFile(filePath,'utf-8')
        return JSON.parse(rawData)
    }
    catch (error) {
        return {"error" : `found error on reading file ${error}`}
    }
}
const readDataAfterDelay = async() => {
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,(5*1000))
    })
    return await readData()
}
const writeDataToFile = (data) => {
    return fs.writeFile(filePath,JSON.stringify(data,null,2))
}

module.exports = {readDataAfterDelay,writeDataToFile}