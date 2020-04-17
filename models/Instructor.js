const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,},
  email: {
    type: String,
    required: true, 
    max: 255, 
    min: 6
  },
  password: {
    type: String,
    required: true, 
    max: 1255, 
    min: 6,
  }
}, {timestamps: true});

module.exports = mongoose.model('Instructor', InstructorSchema);
