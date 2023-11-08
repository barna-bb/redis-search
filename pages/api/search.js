import { searchExercise } from '../../lib/redis';

export default async function handler(req, res) {
  const q = req.query.q;
  const exercise = await searchExercise(q);
  res.status(200).json({ exercise });
}