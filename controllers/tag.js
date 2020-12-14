const db = require('../models')

// all tags
const index = (req, res) => {
  db.tag.findAll().then((foundTags) => {
    if(!foundTags) return res.json({
      message: 'No tags have been found.'
    })
    res.status(200).json({tags: foundTags})
  }) 
}
// one tag
const show = (req, res) => {
  db.tag.findByPk(req.params.id).then((foundTag) => {
    if (!foundTag) return res.json({
      message: 'No tag with that ID has been found.'
    })
    res.status(200).json({tag: foundTag})
  })
}
//  stretch goals!

// create tag - admin protected
const create = (req, res) => {
  db.tag.create(req.body).then((savedTag) => {
    res.status(200).json({tag: savedTag})
  })
}

// delete tag - admin protected
const destroy = (req, res) => {
  db.tag.destroy({
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
  destroy
}