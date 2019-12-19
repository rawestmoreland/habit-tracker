const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create schema
const HabitSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  frequency: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  completed: {
    type: Number,
    required: true
  },
  streak: {
    type: Number,
    required: true
  }
})

module.exports = Habit = mongoose.model('habit', HabitSchema)
