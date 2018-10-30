const fetch = require('node-fetch')
const URL = require('url').URL
const URLSearchParams = require('url').URLSearchParams

// block: object of shape { gistId: string or number, user: string }
// type: string one of ['preview', 'thumbnail']
module.exports = ({ block, type }) => {
  const { gistId } = block
  const user = block.user.toLowerCase()
  const url = `https://bl.ocks.org/${block.user}/raw/${gistId}`
  const filename = `https-bl-ocks-org-${user}-raw-${gistId}-${type}`
  const ext = 'png'
  const viewport = {
    width: 960,
    height: 500
  }
  const resize = {}
  if (type === 'thumbnail') {
    resize.width = 230
    resize.height = 120
  }
  return {
    url,
    filename,
    ext,
    viewport,
    resize
  }
}
