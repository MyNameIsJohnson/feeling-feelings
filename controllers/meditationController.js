const db = require('../models');

const index = (req, res) => {
  db.Meditation.find({})
    .populate('posts.user', 'firstName lastName _id')
    .exec((err, foundMeditations) => {
      if (err) return res.json(err);
  
      res.json(foundMeditations);
    });
};

const show = (req, res) => {
  db.Meditation.findById(req.params.id, (err, foundMeditation) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(foundMeditation);
  });
};



const create = (req, res) => {
  console.log(req.body); 
  db.Meditation.create(req.body, (err, newMeditation) => {
    if (err) return res.json(err);

    res.json(newMeditation);
  });
};


const update = (req, res) => {
  res.sendStatus(200) // 200 = Success/OK

  db.Meditation.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedMeditation) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(updatedMeditation);
  });
};

const destroy = (req, res) => {
  res.sendStatus(200);

  db.Meditation.findByIdAndDelete(req.params.id, (err, deletedMeditation) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(deletedMeditation);
  });
};


module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
