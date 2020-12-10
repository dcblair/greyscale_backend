const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/', ctrl.upload.index)
router.get('/user/:id', ctrl.upload.userIndex)
router.get('/:id', ctrl.upload.show)
router.post('/create', ctrl.upload.create)
router.put('/:id', ctrl.upload.update)
router.delete('/:id', ctrl.upload.destroy)

module.exports = router;
