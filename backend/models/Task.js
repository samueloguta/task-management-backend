const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Add a title'], trim: true, maxlength: 100 },
  description: { type: String, required: [true, 'Add a description'], maxlength: 500 },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
