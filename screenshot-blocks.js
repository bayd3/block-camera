const fs = require('fs')
const util = require('util')
const d3 = require('d3-dsv')
const getScreenshotOptions = require('./get-screenshot-options.js')
const fetch = require('node-fetch')
const URL = require('url').URL

const screenshotBlocks = async ({ path, data, start, batchSize }) => {
  // const path = `${__dirname}/data/no-thumb.csv`
  // const path = `${__dirname}/data/no-thumb-test.csv`
  if (typeof data === 'undefined') {
    const readFile = util.promisify(fs.readFile)
    const dataString = await readFile(path, 'utf-8')
    data = d3.csvParse(dataString)
  }

  // console.log('data', data)
  // console.log('data[0]', data[0])

  const end = Math.min(start + batchSize, data.length)

  // most recent first
  const subset = data.reverse().slice(start, end)
  console.log('subset', subset)

  const subsetOptions = subset.map(block =>
    getScreenshotOptions({ block, type: 'thumbnail' })
  )

  const body = {
    data: subsetOptions
  }

  const screenshotServerUrl = new URL('https://screenshot.micah.fyi/api')
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }
  fetch(screenshotServerUrl, options)
    .then(res => res.text())
    .then(text => {
      console.log(text)
      if (text == '201' && end < data.length) {
        screenshotBlocks({
          data,
          start: end,
          batchSize: 100
        })
      }
    })
    .catch(err => console.log(err))
}

screenshotBlocks({
  path: `${__dirname}/data/no-thumb.csv`,
  start: 0,
  batchSize: 100
})
