const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express()

// Built in bodyparser
app.use(express.json())

// DB config
const db = config.get('mongoURI')

// Connect to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use routes
app.use('/api/habits', require('./routes/api/habits'))
app.use('/api/users', require('./routes/api/users'))

// Serve static assets if in producation
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    )
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
