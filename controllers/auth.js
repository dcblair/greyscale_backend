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

const show = (req, res) => {
  db.user.findByPk(req.params.id).then((foundUser) => {
    if (!foundUser) return res.json({
      message: 'No user with that ID has been found.'
    })
    res.status(200).json({user: foundUser})
  })
}

const update = (req, res) => {
  db.user.update({
    artistName: req.body.artistName,
    email: req.body.email,
    image: req.body.image
  }, {
    where: {
      id: req.params.id
    }
  }).then((updatedUser) => {
    console.log(req.params.id)
    if (!updatedUser) return res.json({
      message: "No user with that ID found."
    })
    res.status(200).json({ user: updatedUser })
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
  show,
  update,
  logout
}
