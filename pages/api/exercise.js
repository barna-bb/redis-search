import { createExercise } from "@/lib/redis";

export default async function handler(req, res) {
    const id = await createExercise(req.body);
    res.status(200).json({id});
}