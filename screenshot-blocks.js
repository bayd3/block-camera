const fs = require('fs')
const d3 = require('d3-dsv')
const screenshotBlock = require('./screenshot-block.js')

const path = './data/no-thumb.csv'
const data = d3.csvParse(fs.readFileSync(path, 'utf-8'))

// console.log('data[0]', data[0])

data.some((block, i) => {
  console.log(`${i} of ${data.length}`)
  screenshotBlock({
    block,
    type: 'thumbnail'
  })
  if (i > 10) return true
})


