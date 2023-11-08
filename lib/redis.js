import { createClient } from 'redis';
import { Schema, Repository } from 'redis-om';

const client = createClient({ url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}:${process.env.REDIS_PORT}` });

async function connect() {
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
}

const exerciseSchema = new Schema('exercise', {
    name: { type: 'string' },
    category: { type: 'string' },
    bodyPart: { type: 'string' }
}, {
    dataStructure: 'JSON'
});

export async function createExercise(data) {
    await connect();
    const exerciseRepository = new Repository(exerciseSchema, client);
    await exerciseRepository.save(data);
}

