const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/', ctrl.label.index)
router.get('/:id', ctrl.label.show)
router.post('/create', ctrl.label.create)
router.put('/:id', ctrl.label.update)
router.delete('/:id', ctrl.label.destroy)

module.exports = router;
