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

// @route  POST api/habits
// @desc   Add a new habit
// @access Public until auth implemented
router.post('/', (req, res) => {
  const newHabit = new Habit({
    name: req.body.name,
    frequency: req.body.frequency,
    target: req.body.target,
    streak: 0,
    completed: 0,
    owner: req.body.owner
  })

  newHabit.save().then(habit => res.json(habit))
})

module.exports = router
