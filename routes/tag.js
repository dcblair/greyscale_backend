const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/', ctrl.tag.index)
router.get('/:id', ctrl.tag.show)
router.post('/create', ctrl.tag.create)
router.delete('/:id', ctrl.tag.destroy)

module.exports = router;