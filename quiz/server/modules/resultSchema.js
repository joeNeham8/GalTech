import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  subcategory: String,
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
