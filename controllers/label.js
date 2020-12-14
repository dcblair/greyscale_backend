const db = require('../models')

// all labels
const index = (req, res) => {
  db.label.findAll().then((foundLabels) => {
    if(!foundLabels) return res.json({
      message: 'No labels have been found.'
    })
    res.status(200).json({labels: foundLabels})
  }) 
}
// one label
const show = (req, res) => {
  db.label.findByPk(req.params.id).then((foundLabel) => {
    if (!foundLabel) return res.json({
      message: 'No label with that ID has been found.'
    })
    res.status(200).json({label: foundLabel})
  })
}

// create label
const create = (req, res) => {
  db.label.create(req.body).then((savedLabel) => {
    res.status(200).json({label: savedLabel})
  })
}

// update label
const update = (req, res) => {
  db.label.update({
    body: req.body.body
  }, {
    where: {
      id: req.params.id
    }
  }).then((updatedLabel) => {
    if (!updatedLabel) return res.json({
      message: "No label with that ID found."
    })

    res.status(200).json({label: updatedLabel})
  })
}

// delete label
const destroy = (req, res) => {
  db.label.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200)
  })
}

module.exports ={
  index,
  show,
  create,
  update,
  destroy
}