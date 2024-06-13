const fs = require("fs");
const path = require("path");
const data = require("./mock.json");

// clearData(data)
const productInfo = [];
for (let i = 0; i < data.length; i++) {
    const oneCategory = data[i];
    const resultData = formatOneCategory(oneCategory, i);
    productInfo.push(resultData);
    console.log(`resultData`, resultData);
}
function formatOneCategory(oneCategory, i) {
    const arr = [];
    for (let j = 0; j < oneCategory.children.length; j++) {
        const twoCategoryData = oneCategory.children[j];
        arr.push({
            type: "title",
            hNumber: 3,
            index: `${i}`,
            content: twoCategoryData.categoryName,
            height: 0,
        });
        for (let k = 0; k < twoCategoryData.children.length; k++) {
            const threeData = twoCategoryData.children[k];

            arr.push({
                type: "title",
                hNumber: 4,
                index: `${i}-${j}`,
                preCategory: twoCategoryData.categoryName,
                content: threeData.categoryName,
                height: 10,
            });
            for (let m = 0; m < threeData.data.length; m++) {
                const product = threeData.data[m];
                arr.push({
                    type: "product",
                    key: "productName",
                    value: product.name,
                    height: 10,
                });
                if (product.brand) {
                    arr.push({
                        type: "product",
                        key: "Model  Make",
                        value: product.brand,
                        height: 10,
                    });
                }

                if (product.application) {
                    arr.push({
                        type: "product",
                        key: "Model",
                        value: product.application,
                        height: 10,
                    });
                }

                if (product.engineBrand) {
                    arr.push({
                        type: "product",
                        key: "Engine Make",
                        value: product.engineBrand,
                        height: 10,
                    });
                }
                if (product.engineNo) {
                    arr.push({
                        type: "product",
                        key: "Engine",
                        value: product.engineNo,
                        height: 10,
                    });
                }
                if (product.oemNo) {
                    arr.push({
                        type: "product",
                        key: "Replaces Part No",
                        value: product.oemNo,
                        height: 10,
                    });
                }

                arr.push({
                    type: "split",
                    content: "1 / 1",
                    height: 2,
                });
            }
        }
    }
    return arr;
}
let idNumber = 0
productInfo.forEach((list) => {
    list.forEach((item) => {
        item.id =`ele-${idNumber}`
        idNumber++
    });
});
fs.writeFileSync(
    path.resolve(__dirname, "./arrData.json"),
    JSON.stringify(productInfo)
);
