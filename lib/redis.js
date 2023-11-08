import { createClient } from 'redis';
import { Schema, Repository } from 'redis-om';

const client = createClient({ url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}:${process.env.REDIS_PORT}` });

async function connect() {
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
}

const exerciseSchema = new Schema('exercise', {
    name: { type: 'string', textSearch: true },
    category: { type: 'string', textSearch: true  },
    bodyPart: { type: 'string', textSearch: true  }
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
    await exerciseRepository.createIndex()
}

export async function searchExercise() {
    await connect();
    const exerciseRepository = new Repository(exerciseSchema, client);
    const exercises = await exerciseRepository.search()
        .where('name').matches(q)
        .or('category').eq(q)
        .or('bodyPart').eq(q)
        .return.all();
    return exercises;
}