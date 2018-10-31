const fs = require('fs')
const util = require('util')
const d3 = require('d3-dsv')
const writeCsv = require('./write-csv.js')

// node --max-old-space-size=8192 parse-bucket-image-metadata.js
async function parseBucketImageMetadata() {
  const inDir = `${__dirname}/data`
  const outDir = `${__dirname}/data`

  //
  // parse bucket files metadata
  //
  let path = `${inDir}/files-in-bucket-blockbuilder-screenshots.csv`
  const readFile = util.promisify(fs.readFile)
  const filesString = await readFile(path, 'utf-8')
  const files = d3.csvParse(filesString)

  const hasThumb = []
  const hasPreview = []

  let user
  let gistId
  let type
  let minBlock
  files.forEach((file, i) => {
    const filenameParts = file.name.split('-')

    // a rough heuristic for
    // does the filename match this pattern
    // https-bl-ocks-org-00min00-raw-b24bdcd2719a99918cbce420af36eb2e-thumbnail.png
    if (filenameParts.length >= 8) {
      user = filenameParts[4]
      gistId = filenameParts[6]
      type = filenameParts[7]

      minBlock = { gistId, user }

      // check if the file has a thumbnail image
      if (type === 'thumbnail.png') hasThumb.push(minBlock)

      // check if the file has a preview image
      if (type === 'preview.png') hasPreview.push(minBlock)
    }
  })

  writeCsv({
    path: `${__dirname}/data/has-thumb-bucket.csv`,
    data: hasThumb
  })
  writeCsv({
    path: `${__dirname}/data/has-preview-bucket.csv`,
    data: hasPreview
  })
}

// call the function
parseBucketImageMetadata()
