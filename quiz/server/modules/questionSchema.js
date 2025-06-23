import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
  questionText: { type: String, required: true }, // renamed from 'questions'
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }, // renamed from 'answers'
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: String },
  difficulty: { type: String, default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Question', questionSchema);
