const fs = require('fs')
const util = require('util')
const d3 = require('d3-dsv')
const getScreenshotOptions = require('./get-screenshot-options.js')
const fetch = require('node-fetch')
const URL = require('url').URL

const screenshotBlocks = async () => {
  const path = `${__dirname}/data/no-thumb.csv`
  const readFile = util.promisify(fs.readFile)
  readFile(path, 'utf-8')
    .then(file => d3.csvParse(file))
    .then(data => {
      // console.log('data', data)
      // console.log('data[0]', data[0])

      // most recent 4,000 examples
      //
      // most recent first, all examples
      const subset = data.reverse() //.slice(0, 4000)
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
        .then(text => console.log(text))
        .catch(err => console.log(err))
    })
}

screenshotBlocks()
