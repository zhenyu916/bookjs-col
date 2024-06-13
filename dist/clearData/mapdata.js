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

fs.writeFileSync(
    path.resolve(__dirname, "./arrData.json"),
    JSON.stringify(productInfo)
);

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

function clearData(originData) {
    const data = originData;
    const productInfo = [];
    let titlePages = [];
    const titleIndexInfo = [];

    for (let i = 0; i < data.length; i++) {
        const oneCategory = data[i];
        const resultData = formatOneCategory(oneCategory, i);
        console.log(`resultData`, resultData);
        const { pageList } = sortContentByTwo(resultData);
        productInfo.push({
            categoryName: oneCategory.categoryName,
            categoryShortDescription: oneCategory.categoryShortDescription,
            pageList,
        });
        titleIndexInfo.push({
            level: 1,
            href: `#voucher-title-${i}`,
            title: oneCategory.categoryName,
            page: pageList[0].pageNumber,
            height: 6,
        });
        console.log(`------=================================================`);
        console.log(pageList);
        pageList.forEach((page) => {
            if (!page) {
                return;
            }
            // console.log(`page`, page);
            page.leftList.concat(page.rightList).forEach((item) => {
                if (!item.hNumber) {
                    return;
                }

                titleIndexInfo.push({
                    level: item.height ? 3 : 2,
                    href: `#voucher-title-${i}-${item.index}`,
                    title: item.content,
                    page: page.pageNumber,
                    height: 6,
                });
            });
        });
        titlePages = sortContentThree(titleIndexInfo);
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


    function sortContentByTwo(sortData) {
        const pageList = [];
        let temp = {
            leftList: [],
            leftHeight: 0,
            leftFull: false,
            maxHeight: 260,
            rightList: [],
            rightFull: false,
            rightHeight: 0,
        };
        let i = 0; // 索引
        while (true) {
            const currentData = sortData[i];
            if (sortData.length === i) {
                temp.pageNumber = pageNumber;
                pageList.push(temp);
                // 一个品牌渲染完成, 强行分页
                pageNumber = pageNumber + 1;
                break;
            }
            if (!temp.leftFull) {
                // 左侧没满 , 尝试加到左侧去
                if (temp.leftHeight + currentData.height > temp.maxHeight) {
                    temp.leftFull = true;
                } else {
                    temp.leftList.push(sortData[i]);
                    temp.leftHeight = temp.leftHeight + currentData.height;
                    i++;
                }
                continue;
            }
            if (!temp.rightFull) {
                // 右边侧没满 , 加到右侧去
                if (temp.rightHeight + currentData.height > temp.maxHeight) {
                    temp.rightFull = true;
                } else {
                    temp.rightList.push(sortData[i]);
                    temp.rightHeight = temp.rightHeight + currentData.height;
                    i++;
                }
                continue;
            }
            if (temp.leftFull && temp.rightFull) {
                // 左右都满了 添加新的分页
                temp.pageNumber = pageNumber;
                pageList.push(temp);
                //内容填充 触发分页
                pageNumber = pageNumber + 1;
                temp = {
                    leftList: [],
                    leftHeight: 0,
                    leftFull: false,
                    maxHeight: 260,
                    rightList: [],
                    rightFull: false,
                    rightHeight: 0,
                };
                pageList.push(undefined);
            }
        }
        return {
            pageList,
        };
    }
    // return {
    //     titlePages,
    //     productInfo,
    // };
}

// fs.writeFileSync(
//     path.resolve(__dirname, "./arrData.json"),
//     JSON.stringify(productInfo)
// );
// fs.writeFileSync(
//     path.resolve(__dirname, "./titlePages.json"),
//     JSON.stringify(titlePages)
// );
