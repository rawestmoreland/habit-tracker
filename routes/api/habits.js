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

// @route  Delete api/habits/id
// @desc   Delete a habit
// @access Public until auth implemented
router.delete('/:id', (req, res) => {
  Habit.findById(req.params.id)
    .then(habit =>
      habit.remove().then(() => res.json({ success: true }))
    )
    .catch(err => err.status(404).json({ success: false }))
})

router.put('/:id', (req, res) => {
  console.log(req.params)
  const data = {
    name: req.body.name,
    frequency: req.body.frequency,
    target: req.body.target,
    streak: req.body.streak,
    completed: req.body.completed,
    lastCompleted: req.body.lastCompleted,
    owner: req.body.owner
  }
  Habit.findByIdAndUpdate(req.params.id, data)
    .then(() => res.json({ success: true }))
    .catch(err => err.status(404).json({ success: false }))
})

module.exports = router
