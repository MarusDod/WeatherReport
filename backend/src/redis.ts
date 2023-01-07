import { createClient } from "redis";

export const sessionClient = createClient({
    url: process.env['REDIS_URL'],
    password: process.env['REDIS_AUTH'],
    legacyMode: true
})

const v4Client = createClient({
    url: process.env['REDIS_URL'],
    password: process.env['REDIS_AUTH'],
})

sessionClient.on('error',err => console.error(err));
sessionClient.on('ready',() => console.log('redis...'));

(async () => {
    await sessionClient.connect()
    await v4Client.connect()
})()

export default v4Client