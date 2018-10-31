const { Storage } = require('@google-cloud/storage')
const writeCsv = require('./write-csv.js')

const listFilesInBucket = async bucketName => {
  const storage = new Storage()

  const [files] = await storage.bucket(bucketName).getFiles()

  // console.log(JSON.stringify(files[0], null, 2))
  // returns metadata that looks like this:
  //
  //   "metadata": {
  //   "kind": "storage#object",
  //   "id": "blockbuilder-screenshots/alachua-county-150000.pdf/1540541276947622",
  //   "selfLink": "https://www.googleapis.com/storage/v1/b/blockbuilder-screenshots/o/alachua-county-150000.pdf",
  //   "name": "alachua-county-150000.pdf",
  //   "bucket": "blockbuilder-screenshots",
  //   "generation": "1540541276947622",
  //   "metageneration": "2",
  //   "timeCreated": "2018-10-26T08:07:56.947Z",
  //   "updated": "2018-10-26T08:07:57.251Z",
  //   "storageClass": "MULTI_REGIONAL",
  //   "timeStorageClassUpdated": "2018-10-26T08:07:56.947Z",
  //   "size": "53838",
  //   "md5Hash": "SJba9sZv6dyoS28zwQAwTQ==",
  //   "mediaLink": "https://www.googleapis.com/download/storage/v1/b/blockbuilder-screenshots/o/alachua-county-150000.pdf?generation=1540541276947622&alt=media",
  //   "crc32c": "YMpIPg==",
  //   "etag": "CKaJzLzTo94CEAI="
  // },

  const data = files.map(file => ({
    name: file.metadata.name,
    selfLink: file.metadata.selfLink,
    timeCreated: file.metadata.timeCreated,
    updated: file.metadata.updated,
    size: file.metadata.size,
    md5Hash: file.metadata.md5Hash,
    crc32c: file.metadata.crc32c,
    etag: file.metadata.etag,
    kind: file.metadata.kind
  }))

  // write files in bucket out to csv
  const path = `${__dirname}/data/files-in-bucket-${bucketName}.csv`
  writeCsv({ path, data })
}

// call listFilesInBucket with the first argument
// from the command line
listFilesInBucket(process.argv[2])
