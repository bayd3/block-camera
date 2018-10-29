const fs = require('fs')
const csvWriter = require('csv-write-stream')

// path:  a string filepath
//
// data: an array of objects
// containing the data you would like
// to write to a csv file
module.exports = ({ path, data }) => {
  // write a csv file
  const writer = csvWriter()
  writer.pipe(fs.createWriteStream(path))
  data.forEach(d => {
    writer.write(d)
  })
  writer.end()
}
