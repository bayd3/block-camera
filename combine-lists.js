const fs = require('fs')
const util = require('util')
const d3 = require('d3-dsv')
const writeCsv = require('./write-csv.js')

async function combineLists() {
  const readFile = util.promisify(fs.readFile)
  let path

  path = './data/no-thumb-gist.csv'
  const gistsNoThumb = d3.csvParse(await readFile(path, 'utf-8'))

  path = './data/has-thumb-bucket.csv'
  const bucketFilesWithThumb = d3.csvParse(await readFile(path, 'utf-8'))

  const data = []

  const bucketHash = {}
  bucketFilesWithThumb.forEach(block => {
    bucketHash[block.gistId] = true
  })

  gistsNoThumb.forEach(block => {
    if (!bucketHash[block.gistId]) data.push(block)
  })

  path = './data/no-thumb.csv'
  writeCsv({ path, data })

  // TODO: do this for preview images too
}

combineLists()
