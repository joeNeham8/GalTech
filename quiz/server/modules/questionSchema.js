import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
  questions: { type: String},
  options: [{ type: String  }],
  answers: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true},
  subcategory: { type: String }, // E.g., Quantitative, JavaScript
  difficulty: { type: String, default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Question', questionSchema);
