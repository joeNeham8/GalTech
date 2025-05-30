import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
  questions: { type: String},
  options: [{ type: String  }],
  answers: { type: String },
  category: { type: String, enum: ['General Aptitude', 'Programming'] },
  subcategory: { type: String }, // E.g., Quantitative, JavaScript
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Question', questionSchema);
