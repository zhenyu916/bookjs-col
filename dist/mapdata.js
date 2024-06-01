const fs = require('fs')
const path = require('path')
const data = require('./mock.json')



// 




fs.writeFileSync(path.resolve(__dirname, './arrData.json'), JSON.stringify(productInfo))
fs.writeFileSync(path.resolve(__dirname, './titlePages.json'), JSON.stringify(titlePages))