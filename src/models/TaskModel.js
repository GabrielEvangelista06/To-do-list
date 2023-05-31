const mongoose = require('mongoose');

const taskListSchema = mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChecklistModel',
    required: true,
  },
});

module.exports = mongoose.model('TaskModel', taskListSchema);
