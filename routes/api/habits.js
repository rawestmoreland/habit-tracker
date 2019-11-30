const express = require('express')
const router = express.Router()

// Habit model
const Habit = require('../../models/Habit')

// @route  GET api/habits
// @desc   Get all habits
// @access Public until auth is implemented
router.get('/', (req, res) => {
  Habit.find()
    .sort({ created: -1 })
    .then(habits => res.json(habits))
})

module.exports = router
