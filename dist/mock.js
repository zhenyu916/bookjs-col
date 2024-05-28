const data = []

for (let i = 0; i < 10; i++) {
    const oneData = {}
    oneData.categoryName = `一级-${i}`
    oneData.children = []
    for (let j = 0; j < 10; j++) {
        const twoData = {}
        twoData.categoryName = `二级-${j}`
        twoData.children = []
        for (let k = 0; k < 10; k++) {
            const threeData = {}
            threeData.categoryName = `三级-${k}`
            threeData.data = []
            for (let m = 0; m < 10; m++) {
                const p = {
                    "productName": `FuelInjector 4010642 For Cummins Engine K38 KTA38_0`,
                    "comparible": `For BOBCAT`,
                    "comparibleEngineBrand": `For BOBCAT`,
                    "modeNumber": `A770,S740,S750,S770,S850,T740,T750_0`,
                    "engineNumber": `D34_0`,
                    "replacementPartNumber": `03 - 970 -0659.5303 - 988 -0458.5303 - 988-05125303 - 988 -0659, 53039700458, 53039700512_0`
                }
                threeData.data.push(p)
            }
            twoData.children.push(threeData)
        }
        oneData.children.push(twoData)
    }
    data.push(oneData)
}

console.log(data);
const fs =require('fs')

fs.writeFileSync('./mock.json' , JSON.stringify(data))
console.log(data);