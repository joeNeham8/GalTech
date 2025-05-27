import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  category: { type: String, enum: ['General Aptitude', 'Programming'], required: true },
  subcategory: { type: String, required: true }, // E.g., Quantitative, JavaScript
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
