const fs = require('fs')
const util = require('util')

// node --max-old-space-size=8192 sample-blocks.js
async function sampleBlocks() {
  const path = `${__dirname}/data/blocks.json`
  const outPath = `${__dirname}/data/blocks-sample.json`
  const readFile = util.promisify(fs.readFile)
  const blocksString = await readFile(path, 'utf-8')
  const blocks = JSON.parse(blocksString)

  const sample = []
  blocks.some((block, i) => {
    console.log('block', JSON.stringify(block, null, 2))
    sample.push(block)
    if (i > 8) return true
  })

  const writeFile = util.promisify(fs.writeFile)
  await writeFile(outPath, JSON.stringify(sample, null, 2))
  console.log(`wrote ${outPath}`)
}

sampleBlocks()
