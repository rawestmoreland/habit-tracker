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
    type: String
  },
  completed: {
    type: Array,
    default: []
  },
  streak: {
    type: Number,
    default: 0
  }
})

module.exports = Habit = mongoose.model('habit', HabitSchema)
