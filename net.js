const logger = require('pino')()
const pump = require('pump')
const network = require('@hyperswarm/network')
const net = network()

const run = (db, discoveryKey, lookup) => {
  net.join(discoveryKey, {
    lookup,
    announce: true
  })

  logger.info(`listening for peers on topic: ${discoveryKey.toString('hex')}`)

  net.on('connection', (socket, details) => {
    const dbStream = db.replicate({live: true})
    const child = logger.child({details})
    child.info(`new connection`)
    pump(dbStream, socket, dbStream, () => {
      logger.info('pipe end')
    })
  })
}

module.exports = run
