'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const link = new Link({
    grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

// peer.request('rpc_test', { msg: 'hello' }, { timeout: 10000 }, (err, data) => {
//     if (err) {
//         console.error(err)
//         process.exit(-1)
//     }
//     console.log(data) // { msg: 'world' }
// })

// peer.request('orderBook', { type: 'buy', price: 100, quantity: 10  }, { timeout: 10000 }, (err, data) => {
//     if (err) {
//         console.error(err)
//         process.exit(-1)
//     }
//     console.log(data)
// })

peer.request('orderBook', { type: 'sell', price: 10, quantity: 10  }, { timeout: 10000 }, (err, data) => {
    if (err) {
        console.error(err)
        process.exit(-1)
    }
    console.log(data)
})