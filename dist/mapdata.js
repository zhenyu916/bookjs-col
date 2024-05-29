const fs = require('fs')
const path = require('path')
const data = require('./data.json')
console.log(data);
const res = []
for (let i = 0; i < data.length; i++) {
    const oneCategory = data[i]
    const resultData = formatOneCategory(oneCategory, i)
    res.push({
        categoryName: oneCategory.categoryName,
        arrdata: resultData
    })

}

function formatOneCategory(oneCategory, i) {
    const arr = []
    //  加入三级标题
    console.log(`dddd`);
    for (let j = 0; j < oneCategory.children.length; j++) {
        const twoCategoryData = oneCategory.children[j];
        arr.push({
            type: 'title',
            hNumber: 3,
            index: `${i}`,
            content: twoCategoryData.categoryName,
            height: 10
        })
        console.log(`twoCategoryData`, twoCategoryData);
        for (let k = 0; k < twoCategoryData.children.length; k++) {
            const threeData = twoCategoryData.children[k]
            arr.push({
                type: 'title',
                hNumber: 4,
                index: `${i}-${j}`,
                content: threeData.categoryName,
                height: 10
            })
            for (let m = 0; m < threeData.data.length; m++) {
                const product = threeData.data[m];
                arr.push({
                    type: 'product',
                    key: "productName",
                    value: product.productName,
                    height: 10
                })
                if (product.comparible) {
                    arr.push({
                        type: 'product',
                        key: "Comparible",
                        value: product.comparible,
                        height: 10
                    })
                }
                if (product.comparibleEngineBrand) {
                    arr.push({
                        type: 'product',
                        key: "Comparible EngineBrand",
                        value: product.comparibleEngineBrand,
                        height: 10
                    })
                }
                if (product.modeNumber) {
                    arr.push({
                        type: 'product',
                        key: "Mode Number",
                        value: product.modeNumber,
                        height: 10
                    })
                }
                if (product.engineNumber) {
                    arr.push({
                        type: 'product',
                        key: "Engine Number",
                        value: product.engineNumber,
                        height: 10
                    })
                }
                if (product.replacementPartNumber) {
                    arr.push({
                        type: 'product',
                        key: "Replacement PartNumber",
                        value: product.replacementPartNumber,
                        height: 10
                    })
                }

                arr.push({
                    type: 'split',
                    content: '1 / 1',
                    height: 2
                })
            }

        }
    }


    return arr
}

console.log(res);

fs.writeFileSync(path.resolve(__dirname, './arrData.json'), JSON.stringify(res))