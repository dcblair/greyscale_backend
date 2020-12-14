const router = require('express').Router()
const passport = require('../passport')
const ctrl = require('../controllers')

router.get('/:id', ctrl.auth.show)
router.post('/login', passport.authenticate('local'), ctrl.auth.login)
router.post('/register', ctrl.auth.register)
router.put('/:id', ctrl.auth.update)
router.delete('/logout', ctrl.auth.logout)
router.delete('/:id', ctrl.auth.destroy)

module.exports = router;
