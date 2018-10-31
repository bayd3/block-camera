const fs = require('fs')
const util = require('util')
const writeCsv = require('./write-csv.js')

// node --max-old-space-size=8192 parse-image-metadata.js
async function parseImageMetadata() {
  const path = `${__dirname}/data/blocks.json`
  const outDir = `${__dirname}/data`
  const readFile = util.promisify(fs.readFile)
  const blocksString = await readFile(path, 'utf-8')
  const blocks = JSON.parse(blocksString)

  const hasThumb = []
  const hasPreview = []

  const noThumb = []
  const noPreview = []

  let gistId
  let user
  let minBlock
  blocks.forEach((block, i) => {
    minBlock = { gistId: block.id, user: block.owner.login }

    // check if the block has a thumbnail image
    if (block.files['thumbnail.png']) hasThumb.push(minBlock)
    else noThumb.push(minBlock)

    // check if the block has a preview image
    if (block.files['preview.png']) hasPreview.push(minBlock)
    else noPreview.push(minBlock)
  })

  writeCsv({ path: `${__dirname}/data/has-gist-thumb.csv`, data: hasThumb })
  writeCsv({ path: `${__dirname}/data/has-gist-preview.csv`, data: hasPreview })
  writeCsv({ path: `${__dirname}/data/no-gist-thumb.csv`, data: noThumb })
  writeCsv({ path: `${__dirname}/data/no-gist-preview.csv`, data: noPreview })
}

parseImageMetadata()
