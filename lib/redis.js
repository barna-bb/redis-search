import { createClient } from 'redis';
import { Schema, Repository } from 'redis-om';

const client = createClient({ url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}:${process.env.REDIS_PORT}` });
let isOpen = false;

async function connect() {
    if (!isOpen) {
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        isOpen = true;
    }
}

const exerciseSchema = new Schema('exercise', {
    name: { type: 'text', textSearch: true },
    category: { type: 'string', },
    bodyPart: { type: 'string', }
}, {
    dataStructure: 'JSON'
});

export async function createExercise(data) {
    await connect();
    const exerciseRepository = new Repository(exerciseSchema, client);
    await exerciseRepository.save(data);
}

export async function createIndex() {
    await connect();
    const exerciseRepository = new Repository(exerciseSchema, client);
    await exerciseRepository.createIndex();
}

export async function searchExercise(q) {
    await connect();
    const exerciseRepository = new Repository(exerciseSchema, client);
    const exercises = await exerciseRepository.search()
        .where('name').matches(q)
        .or('category').equals(q)
        .or('bodyPart').equals(q)
        .return.all();
    return exercises;
}