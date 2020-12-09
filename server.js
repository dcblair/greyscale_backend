const express = require('express')
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')

const routes = require('./routes')
const passport = require('passport')

const port = process.env.PORT || 4000
const app = express()


app.use(morgan('dev'))

app.use(express.json())

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100 * 60 * 60 * 24
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/auth', routes.auth)
// add other routes here


app.listen(port, () => console.log(`Server running on port ${port}`))