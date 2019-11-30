const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create schema
const HabitSchema = new Schema({
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
  lastUpdated: {
    type: Array,
    required: true
  },
  streak: {
    type: Number,
    required: true
  }
})

module.exports = Habit = mongoose.model('habit', HabitSchema)
