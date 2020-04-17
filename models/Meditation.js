const mongoose = require('mongoose');
const Post = require('./Post');

const MeditationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  posts: [Post.schema],
});

const Meditation = mongoose.model('Meditation', MeditationSchema);

module.exports = Meditation;