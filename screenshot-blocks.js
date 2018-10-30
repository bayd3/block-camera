const fs = require('fs')
const util = require('util')
const d3 = require('d3-dsv')
const screenshotBlock = require('./screenshot-block.js')
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

      const subset = data.slice(data.length - 10, data.length)
      console.log('subset', subset)

      const screenshotServerUrl = new URL('https://screenshot.micah.fyi/api')
      fetch(screenshotServerUrl, {
        method: 'POST',
        body: JSON.stringify(subset),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => console.log(res))
      // .then(json => console.log(json))
    })
}

screenshotBlocks()
