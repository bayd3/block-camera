const fetch = require('node-fetch')
const URL = require('url').URL
const URLSearchParams = require('url').URLSearchParams

module.exports = block => {
  // construct pageUrl
  const pageUrl = `https://bl.ocks.org/${block.user}/raw/${block.gistId}`
  const filename = `https-bl-ocks-org-${block.user.toLowerCase()}-raw-${
    block.gistId
  }-preview`
  const ext = 'png'

  // this can be any server running the micahstubbs/screenshot-service project
  // https://github.com/micahstubbs/screenshot-service
  const screenshotServerUrl = new URL('https://screenshot.micah.fyi/api/')
  const params = new URLSearchParams(screenshotServerUrl.search)
  params.set('url', pageUrl)
  params.set('id', '1e9cb2bb-4b64-4152-aaa9-eb0be182e7cc')
  params.set('ext', ext)
  params.set('filename', filename)
  screenshotServerUrl.search = params
  fetch(screenshotServerUrl).catch(err => console.error(err))
}
