const db = require('../models')
const Op = db.sequelize.Op

const index = (req, res) => {
  db.upload.findAll({
    where: { 
      "isPublic": true
    },
    order: [
      [ 'createdAt', 'DESC' ]
    ]
  }).then((foundUploads) => {
    if(!foundUploads) return res.json({
      message: 'No uploads have been found.'
    })
    res.status(200).json({ uploads: foundUploads })
  }) 
}

const userIndex = (req, res) => {
  db.upload.findAll({
    where: {
      "userId": req.params.id,
    },
    order: [
      [ 'createdAt', 'DESC' ]
    ]
  }).then((foundUploads) => {
    if(!foundUploads) return res.json({
      message: 'No user uploads have been found.'
    })
    res.status(200).json({ uploads: foundUploads })
  }) 
}

const random = (req, res) => {
  db.upload.findAll({
    order: [
      db.sequelize.random()
    ],
    limit: 3
  }).then((foundUploads) => {
    if (!foundUploads) return res.json({
      message: 'No upload with that ID has been found.'
    })
    res.status(200).json({uploads: foundUploads})
  })
}

const show = (req, res) => {
  db.upload.findByPk(req.params.id).then((foundUpload) => {
    if (!foundUpload) return res.json({
      message: 'No upload with that ID has been found.'
    })
    res.status(200).json({upload: foundUpload})
  })
}

const search = (req, res) => {
  db.upload.findAll({
    where: {
      'isPublic': true,
      // name: { [Op.like]: req.body.searchInput },
      // music: { [Op.like]: req.body.searchInput },
      // artist: { [Op.like]: req.body.searchInput },
      // album: { [Op.like]: req.body.searchInput },
      genre: { [Op.like]: req.body.searchInput },
    }
  })
}

const create = (req, res) => {
  db.upload.create(req.body).then((savedUpload) => {
    res.status(200).json({ upload: savedUpload })
  })
}

const update = (req, res) => {
  console.log(req.body)
  db.upload.update({
    labelId: req.body.labelId,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre
  }, {
    where: {
      id: req.params.id
    }
  }).then((updatedUpload) => {
    console.log(req.params.id)
    if (!updatedUpload) return res.json({
      message: "No upload with that ID found."
    })
    res.status(200).json({ upload: updatedUpload })
  })
}

const destroy = (req, res) => {
  db.upload.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200)
  })
}

module.exports ={
  index,
  userIndex,
  random,
  show,
  search,
  create,
  update,
  destroy
}