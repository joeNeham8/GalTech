
import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  subcategories: [{ type: String, trim: true }] // <-- add this line
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
