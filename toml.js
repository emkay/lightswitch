const {promisify} = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const toml = require('@iarna/toml')

const parse = async p => {
  const file = await readFile(p)
  const config = toml.parse(file)
  return config
}

module.exports = parse
