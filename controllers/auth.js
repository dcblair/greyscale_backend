const db = require('../models')

const login = (req, res) => {
  res.json({ 
    user: req.user.id,
    artistName: req.user.artistName
  })
}

const register = (req, res) => {
  const { artistName, email, password } = req.body
  console.log(req.body)
  
  if (!artistName || !email || !password) {
    return res.json({ message: 'Please enter an artist/band name, an email, and a password' })
  }

  db.user.findOne({ where: { email } })
    .then(foundUser => {
      if (foundUser) {
        return res.json({ message: "A user with that email already exists" })
      }

      db.user.create({
        artistName,
        email,
        password
      }).then(newUser => {
        console.log('New user created!')
        res.json(newUser)
      })
    })
}

const logout = (req, res) => {
  if (!req.user) {
    return res.json({ message: 'No User to log out' })
  }
  req.logout()
  res.json({ message: "User logged out" })
}

module.exports = {
  login,
  register,
  logout
}
