const fs = require("fs");
const path = require("path");
const eleHeightData = require("./eleHeightData.json");
const originData = require("./mock.json");


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
let pageNumber = 1;


let titlePages = [];
const titleIndexInfo = [];
const productInfo = [];
for (let i = 0; i < originData.length; i++) {
    const oneCategory = originData[i];
    const resultData = eleHeightData[i];
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
}
titlePages = sortContentThree(titleIndexInfo);
fs.writeFileSync(
    path.resolve(__dirname, "./productInfo.json"),
    JSON.stringify(productInfo)
);
fs.writeFileSync(
    path.resolve(__dirname, "./titlePages.json"),
    JSON.stringify(titlePages)
);

console.log(`pageNumber`, pageNumber);
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

function sortContentThree(sortData) {
    const pageList = [];
    const empty = {
        maxHeight: 260,

        leftList: [],
        leftHeight: 0,
        leftFull: false,

        middleList: [],
        middleFull: false,
        middleHeight: 0,

        rightList: [],
        rightFull: false,
        rightHeight: 0,
    };
    let temp = JSON.parse(JSON.stringify(empty));
    let i = 0; // 索引
    while (true) {
        const currentData = sortData[i];
        if (sortData.length === i) {
            pageList.push(temp);
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
        if (!temp.middleFull) {
            // 左侧没满 , 尝试加到左侧去
            if (temp.middleHeight + currentData.height > temp.maxHeight) {
                temp.middleFull = true;
            } else {
                temp.middleList.push(sortData[i]);
                temp.middleHeight = temp.middleHeight + currentData.height;
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
        if (temp.leftFull && temp.middleFull && temp.rightFull) {
            // 左右都满了 添加新的分页
            pageList.push(temp);
            temp = JSON.parse(JSON.stringify(empty));
            pageList.push(undefined);
        }
    }

    return pageList;
}
// const { pageList } = sortContentByTwo(eleHeightData);
