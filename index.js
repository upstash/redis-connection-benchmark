const { performance } = require("perf_hooks");
const hdr = require("hdr-histogram-js");
const Redis = require('ioredis')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const options = {
    host: 'END_POINT',
    port: 6379,
    // password: ''
};

const total = 10000;

async function benchReuse() {
    const client = new Redis(options);
    const hist = hdr.build();
    for (let index = 0; index < total; index++) {
        let start = performance.now() * 1000 // to μs
        client.ping()
        let end = performance.now() * 1000 // to μs
        hist.recordValue(end-start)
        await delay(10)
    }
    client.quit()
    console.log(hist.outputPercentileDistribution(1, 1));
}

async function bench() {
    const hist = hdr.build();
    for (let index = 0; index < total; index++) {
        let start = performance.now() * 1000 // to μs
        const client = new Redis(options);
        client.ping()
        client.quit()
        let end = performance.now() * 1000 // to μs
        hist.recordValue(end-start)
        await delay(10)
    }
    console.log(hist.outputPercentileDistribution(1, 1));
}

bench();