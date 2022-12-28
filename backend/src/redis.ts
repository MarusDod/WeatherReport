import { createClient } from "redis";

const client = createClient({
    url: `redis://${process.env['REDIS_URL']}`,
    password: process.env['REDIS_AUTH'],
})

client.on('error',err => console.error(err));
client.on('ready',() => console.log('redis...'));

(async () => {
    await client.connect()
})()

export default client