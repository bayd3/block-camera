const fs = require('fs')
const util = require('util')

// node --max-old-space-size=8192 sample-files-blocks.js
async function sampleFilesBlocks() {
  const path = `${__dirname}/data/files-blocks.json`
  const readFile = util.promisify(fs.readFile)
  const blockFilesString = await readFile(path, 'utf-8')
  const blockFiles = JSON.parse(blockFilesString)

  blockFiles.some((block, i) => {
    console.log(JSON.stringify(block, null, 2))
    if (i > 8) return true
  })
}

sampleFilesBlocks()
