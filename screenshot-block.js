const fetch = require('node-fetch')
const URL = require('url').URL
const URLSearchParams = require('url').URLSearchParams

// block: object of shape { gistId: string or number, user: string }
// type: string one of ['preview', 'thumbnail']
module.exports = ({ block, type }) => {
  // construct pageUrl
  const pageUrl = `https://bl.ocks.org/${block.user}/raw/${block.gistId}`
  console.log(pageUrl)

  let filename = `https-bl-ocks-org-${block.user.toLowerCase()}-raw-${
    block.gistId
  }-${type}`
  const ext = 'png'

  // this can be any server running the micahstubbs/screenshot-service project
  // https://github.com/micahstubbs/screenshot-service
  const screenshotServerUrl = new URL('https://screenshot.micah.fyi/api/')
  const params = new URLSearchParams(screenshotServerUrl.search)
  params.set('url', pageUrl)
  params.set('id', '1e9cb2bb-4b64-4152-aaa9-eb0be182e7cc')
  params.set('ext', ext)
  params.set('vwidth', 960)
  params.set('vheight', 500)
  if (type === 'thumbnail') {
    params.set('rwidth', 230)
    params.set('rheight', 120)
  }
  params.set('filename', filename)
  params.set('reply', 'no')
  screenshotServerUrl.search = params
  fetch(screenshotServerUrl).catch(err => console.error(err))
}
