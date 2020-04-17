const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);