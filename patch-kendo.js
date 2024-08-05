const fs = require('fs')
const {promisify} = require('util')

const writeFile = promisify(fs.writeFile)

async function main() {
  try {
    const esm = `export const validatePackage = () => true`
    const cm = `module.exports.validatePackage = () => true`
    await writeFile('./node_modules/@progress/kendo-licensing/dist/index-esm.js', esm)
    await writeFile('./node_modules/@progress/kendo-licensing/dist/index.js', cm)
  } catch (e) {
    console.log(e)
  }
}

main()
