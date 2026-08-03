import { Schema, model } from 'mongoose';

/** Backs atomic auto-increment sequences (e.g. invoice numbers). */
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, required: true, default: 0 },
});

export const Counter = model('Counter', counterSchema);

export async function getNextSequence(name: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
  );
  return counter.seq;
}
