const mongoose = require('mongoose');

const checkListSchema = mongoose.Schema({
  name: { type: String, required: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskModel',
    },
  ],
});

module.exports = mongoose.model('ChecklistModel', checkListSchema);
