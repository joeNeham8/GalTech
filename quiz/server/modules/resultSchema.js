import mongoose from 'mongoose';
const { Schema } = mongoose;

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  subcategory: String,
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Result', resultSchema);
